# 분실물 및 습득물 찾기 웹 사이트

## 개발 기간

2023.02.11 ~ 2023.02.19

## 내 물건 찾기

분실물 및 습득물을 찾을 수 있는 웹 사이트입니다.
경찰청 페이지에 올린 분실물 글과, 경찰청과 연계된 각종 포털 기관에서 습득한 습득물을 살펴볼 수 있습니다.

React와 typescript를 이용했으며, typescript를 처음 이용해보고자 진행한 프로젝트이기 때문에 미숙한 부분이 있을 수 있습니다.

<div align=left><h1>사용 기술</h1></div>

<div align=left> 
  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> 
  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> 
  <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white">
  <img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white">

</div>

## 주요 기능

1. 경찰청 공공데이터를 이용해, 경찰청 페이지에 올라간 분실물 글 확인 가능.
2. 경찰청과 연계된 각종 포털 기관에서 습득한 습득물 확인 가능.
3. 경찰청 공공코드를 이용하여 검색할 지역 및 물품을 코드화 후, 검색할 수 있도록 구현.

## 구현 화면

### 기본 화면 및 목록

<div>
	<img src="https://user-images.githubusercontent.com/103877647/219937639-5d67eedb-ede6-42e8-b0a5-b6c14e9ec3eb.png" width="900" height="600" />
	<img src="https://user-images.githubusercontent.com/103877647/219937654-f1192781-b772-4955-a3ae-abd8a92117e4.png" width="900" height="600" />
	<img src="https://user-images.githubusercontent.com/103877647/219937677-dcd9412e-51e1-450d-ab8a-42f785217bf1.png" width="900" height="600" />
</div>
<br />

### 검색 팝업

<div>
	<img src="https://user-images.githubusercontent.com/103877647/219937726-589ce0b7-b56e-408c-b6f4-1da1880ae614.png" width="900" height="600" />
	<img src="https://user-images.githubusercontent.com/103877647/219937751-330524ed-84f4-475a-9bc0-a0a226ece219.png" width="900" height="600" />
	<img src="https://user-images.githubusercontent.com/103877647/219937768-dc7b27bf-26bc-4ab7-9389-a26858004fed.png" width="900" height="600" />
</div>
<br />

### 상세 정보 창

<div>
	<img src="https://user-images.githubusercontent.com/103877647/219937956-decb2c87-f5be-4c72-94f5-67e4b06a01fa.png" width="900" height="600" />
	<img src="https://user-images.githubusercontent.com/103877647/219937965-d8a87866-7f31-4161-b8f6-d543b95aa266.png" width="900" height="600" />
</div>
<br />

## 주요 코드

### 분실물 및 습득물 목록

```typescript
interface keyword {
    type: string;
    params: {
        pageNo: number;
        numOfRows: number;
        START_YMD?: string;
        END_YMD?: string;
        PRDT_CL_CD_01?: string;
        PRDT_CL_CD_02?: string;
        LST_LCT_CD?: string;
    };
}

const dispatch = useAppDispatch();
const { data, loading } = useAppSelector((state) => state.LossSlice);
const { data: data2 } = useAppSelector((state) => state.SearchSlice);
const [count, setCount] = useState(1);
const [pop, setPop] = useState(false);
const [keyword, setKeyword] = useState<keyword>({
    type: "list",
    params: { pageNo: 1, numOfRows: 10, START_YMD: dayjs().format("YYYYMMDD"), END_YMD: dayjs().format("YYYYMMDD") },
});

const search = useMemo(() => {
    return { type: "list", params: { ...keyword.params, pageNo: count } };
}, [count, keyword]);

useEffect(() => {
    dispatch(getList(search));
}, [search]);

const plus = useCallback(() => {
    setCount(count + 1);
}, [count]);

const minus = useCallback(() => {
    if (count - 1 != 0) {
        setCount(count - 1);
    }
}, [count]);
```

<br />

### 검색 창 팝업, 검색 기능

```typescript
const onPop = useCallback(() => {
    setPop(!pop);
}, [pop]);

const kindChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>): void => {
    const current: string = e.target.value;
    dispatch(getCode({ kind: current }));
}, []);

const searchSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const current = e.currentTarget;
        const startDate: Date = current.startDate.value;
        const endDate: Date = current.endDate.value;
        const place: string = current.place.value;
        const kind1: string = current.kind1.value;
        const kind2: string = current.kind2.value;

        let params = {
            type: "list",
            params: {
                pageNo: 1,
                numOfRows: 10,
                START_YMD: dayjs(startDate).format("YYYYMMDD"),
                END_YMD: dayjs(endDate).format("YYYYMMDD"),
                PRDT_CL_CD_01: kind1,
                PRDT_CL_CD_02: kind2,
                N_FD_LCT_CD: place,
            },
        };

        dispatch(getList(params));
        setKeyword(params);
        setPop(!pop);
    },
    [pop],
);
```

<br />

## 상세 정보

```typescript
const { id } = useParams();
const dispatch = useAppDispatch();
const { data, loading } = useAppSelector((state) => state.LossSlice);

useEffect(() => {
    if (id != undefined) {
        dispatch(getList({ type: "info", params: { ATC_ID: id } }));
    }
}, []);
```

<br />

## Redux Slice

```typescript
export const getList = createAsyncThunk<result, keyword, { rejectValue: ErrorClass }>("LossSlice/getList", async (payload, { rejectWithValue }) => {
    let type: string | null = null;
    let params: info | null = null;

    if (payload.type == "list") {
        type = "getLostGoodsInfoAccToClAreaPd";
    } else if (payload.type == "info") {
        type = "getLostGoodsDetailInfo";
    }

    if (typeof payload.params == "object" && typeof service == "string") {
        params = payload.params;
        params.serviceKey = service;
    }

    try {
        const response = await axios.get(`${API_URL}/${type}`, {
            params: params,
        });
        return response.data.response.body;
    } catch (err) {
        if (err instanceof ErrorClass) {
            return rejectWithValue(err);
        }
    }
});
```
