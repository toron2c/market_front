import {IProduct, isError} from "./productsSlice";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {apiGetProduct} from "../api/api";


interface IProductFull extends IProduct{
    description: string
}

interface IStateProduct {
    product : IProductFull,
    error: string | null
}


export const getProduct = createAsyncThunk<IProductFull,string, {rejectValue:string}>(
    'product/getProduct',
    async function(id, {rejectWithValue}) {
        try {
            const data = await apiGetProduct(id);
                return (data.data) as IProductFull;
        } catch {
            return rejectWithValue('Error product loading')
        }
    }
)

const initialState:IStateProduct = {
    product: {
        name: '',
        description: '',
        url_img: '',
        price: '',
        count: '',
        id: ''
    },
    error: null
}

const productSlice = createSlice({
    name:'product',
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
            .addCase(getProduct.fulfilled, (state, action) => {
                state.product = action.payload;
                state.error = null;
            })
            .addMatcher(isError, (state, action:PayloadAction<string>) => {
                state.error = action.payload;
            })
    }
})


export default productSlice.reducer;