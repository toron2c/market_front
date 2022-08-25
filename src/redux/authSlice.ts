import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {apiAuthorization, apiRegistration} from "../api/api";
import {getProducts, isError} from "./productsSlice";

export type IId =  null |string;


interface IInfoUser  {
    isAuth: boolean;
    id: IId;
}
export type IDataUser = {
    login: string;
    password: string;
}

interface dataAuth extends IDataUser  {
    loading: boolean,
    repeatPass: string;
    error: string | null;
    errorLogin: boolean;
    errorPass: boolean;
    errorRepeat: boolean;
    infoUser: IInfoUser
}

export const registration = createAsyncThunk<IId,IDataUser,{rejectValue:string}>(
    'user/registration',
    async function(data, {rejectWithValue}) {
        try {
            const res = await apiRegistration(data.login, data.password);
            return (res.data.id) as IId;
        } catch {
            return rejectWithValue('Error registration');
        }
    }
)

export const authorization = createAsyncThunk<IId, IDataUser, {rejectValue: string}>(
    'user/authorization',
    async function(data, {rejectWithValue}) {
        try {
            const res = await apiAuthorization(data.login, data.password);
            return (res.data.id) as IId;
        } catch {
            return rejectWithValue('Error authorization');
        }
    }
)

const initialState:dataAuth = {
    loading: false,
    login: '',
    password: '',
    repeatPass: '',
    error: null,
    errorLogin: false,
    errorPass: false,
    errorRepeat: false,
    infoUser: {
        isAuth: false,
        id: null
    }
};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateLogin(state, action:PayloadAction<string>) {
            state.login = action.payload;
        },
        updatePassword(state, action:PayloadAction<string>) {
            state.password = action.payload;
        },
        updateRepeatPassword(state, action:PayloadAction<string>) {
            state.repeatPass = action.payload;
        },
        checkLogin(state) {
            const regexp = /^[a-z0-9]+$/i;
            state.errorLogin = !(state.login !== '' && regexp.test(state.login));
        },
        checkPass(state) {
            const regexp = /^[a-z0-9]+$/i;
            state.errorPass = !(state.password !== '' && regexp.test(state.password));
        },
        checkRepeat(state) {
           state.errorRepeat = !(state.password === state.repeatPass);
        },
        removeError(state) {
            state.error = null;
        },
        logout(state) {
            state.infoUser.id = null;
            state.infoUser.isAuth = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) =>{
                state.loading = true;
            })
            .addCase(getProducts.fulfilled, (state)=> {
                state.loading = false;
            })
            .addCase(registration.pending, (state) => {
                state.loading = false;
                state.error = null;
                state.password = '';
                state.login = '';
                state.repeatPass = '';
            })
            .addCase(registration.fulfilled, (state,action) => {
                state.loading = false;
                state.infoUser.id = action.payload;
                state.infoUser.isAuth = true;
            })
            .addCase(authorization.pending, (state) => {
                state.loading = true;
                state.password = '';
                state.login = '';
            })
            .addCase(authorization.fulfilled, (state,action) => {
                state.loading = false;
                state.infoUser.id = action.payload;
                state.infoUser.isAuth = true;
            })
            .addMatcher(isError, (state,action:PayloadAction<string>)=> {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export const {
    updateLogin,
    updatePassword,
    updateRepeatPassword,
    checkLogin,
    checkPass,
    checkRepeat,
    removeError,
    logout,

} = authSlice.actions;

export default authSlice.reducer;