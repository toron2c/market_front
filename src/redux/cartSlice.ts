import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    apiChangeCountProduct,
    apiCreateOrder,
    apiGetCart,
    apiGetShortInfoProduct,
    apiPostProductToCart
} from "../api/api";
import {isError} from "./productsSlice";
import {IId} from "./authSlice";

interface IInfoCartElement {
    name: string
    description: string
    url_img: string
    price: number
    count: number
}

interface ICartElement {
    product_id: string
    countProduct: number
    infoCartElement: IInfoCartElement
}

interface IDataOrder {
    countProducts: number
    totalPrice: number
}

interface ICartSlice extends IDataOrder{
    error: string | null
    list: ICartElement[]
    statusCreateOrder: boolean | null
}

export interface IPostData {
    id: IId
    product_id: string
}

export interface IPutData extends IPostData{
    action: string
}
interface IResponsePut {
    id: string,
    newCount: number
}

export interface IElementOrder {
    id: string
    count: number
}

export interface IPostOrder {
    products: IElementOrder[]
    idUser: IId
}

export const getCart = createAsyncThunk<ICartElement[], string, {rejectValue:string}>(
    'cart/getCart',
    async function(id, {rejectWithValue}) {
        try {
            const data = await apiGetCart(id);
            if (data.data === 'cart empty') {
                const new_data: ICartElement[] = [];
                return (new_data) as ICartElement[];
            } else {
                for (const el of data.data) {
                    let infoProduct = await apiGetShortInfoProduct(el.product_id);
                    el.infoCartElement = infoProduct.data;
                }
            }

            return (data.data) as ICartElement[]
        } catch {
            return rejectWithValue('error loading cart')
        }
    }
)

export const putCart = createAsyncThunk<IResponsePut, IPutData, {rejectValue:string}>(
    'cart/putCart',
    async function(data, {rejectWithValue}) {
        try {
           const response = await apiChangeCountProduct(data.id, data.product_id, data.action)
            const newData: IResponsePut = {
               id: data.product_id,
                newCount: response.data.newCount
            }
            return (newData) as IResponsePut;
        } catch {
            return rejectWithValue('Error change count product')
        }
    }
)

export const postProductToCart = createAsyncThunk<ICartElement,IPostData, {rejectValue:string}>(
    'cart/postCart',
    async function(data, {rejectWithValue}) {
        try {
            await apiPostProductToCart(data.id,data.product_id);
            let infoProduct = await apiGetShortInfoProduct(data.product_id);
            const newElement:ICartElement = {
                product_id: data.product_id,
                countProduct: 1,
                infoCartElement: infoProduct.data
            }
            return (newElement) as ICartElement;
        } catch {
            return rejectWithValue('Error add product to cart');
        }
    }
)
export const createOrder = createAsyncThunk<boolean, IPostOrder, {rejectValue:string}>(
    'cart/createOrder',
    async function(data, {rejectWithValue}) {
        try {
            await apiCreateOrder(data.products, data.idUser);
            return true;
        } catch {
            return rejectWithValue('Error create order');
        }
    }
)

const initialState:ICartSlice = {
    error: null,
    list: [],
    countProducts: 0,
    totalPrice: 0,
    statusCreateOrder: null
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCountProducts(state) {
            state.countProducts = state.list.reduce<number>((sum: number, el: ICartElement) => {
                return sum + el.countProduct;
            }, 0);
        },
        setTotalPrice(state) {
            state.totalPrice = state.list.reduce<number>((sum:number, el:ICartElement) => {
               return sum + (el.countProduct * el.infoCartElement.price)
            },0)
        },
        setStatusCreateOrder(state) {
            state.statusCreateOrder = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCart.fulfilled, (state, action) => {
                state.list = action.payload;
            })
            .addCase(putCart.fulfilled, (state, action) => {
                if (action.payload.newCount === 0) {
                   state.list = state.list.filter(el=> el.product_id !== action.payload.id);
                } else {
                    state.list.forEach((el)=> {
                        if (el.product_id === action.payload.id) {
                            el.countProduct = action.payload.newCount;
                        }
                    })
                }
            })
            .addCase(postProductToCart.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.statusCreateOrder = action.payload;
                state.list = [];
            })
            .addMatcher(isError, (state, action:PayloadAction<string>) => {
                state.error = action.payload;
            })
    }
})

export const {
    setCountProducts,
    setTotalPrice,
    setStatusCreateOrder
} = cartSlice.actions

export default cartSlice.reducer