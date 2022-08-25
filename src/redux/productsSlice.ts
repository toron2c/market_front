import {createSlice, createAsyncThunk, AnyAction, PayloadAction} from "@reduxjs/toolkit";
import {apiGetProducts} from "../api/api";

export interface IProduct  {
    url_img:string
    name:string
    price:string
    count:string
    id:string
}

interface IProducts  {
    list: IProduct[],
    error: string | null
}

export const getProducts = createAsyncThunk<IProduct[], undefined, {rejectValue:string}>(
    'products/getProducts',
    async function (_, {rejectWithValue}) {
        try {
            const data = await apiGetProducts();
            return (data.data.products) as IProduct[];
        } catch (e) {
            console.log(e)
            return rejectWithValue('error loading data');
        }
    }
);

const initialState: IProducts = {
    list: [],
    error: null
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) =>{
                state.error = null;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.list = action.payload;
            })
            .addMatcher(isError, (state, action:PayloadAction<string>) => {
              state.error = action.payload;
            })
    }
});

export default productsSlice.reducer;


export function isError(action: AnyAction) {
    return action.type.endsWith('rejected');
}