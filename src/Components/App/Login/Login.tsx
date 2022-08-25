import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../hook/hooks";
import {
    authorization,
    checkLogin,
    checkPass,
    IDataUser,
    removeError,
    updateLogin,
    updatePassword
} from "../../../redux/authSlice";
import ErrorComponent from "../Signup/ErrorComponent/ErrorComponent";
import React, {useEffect} from "react";


export default function Login() {
    const login = useAppSelector(state=>state.auth.login);
    const password = useAppSelector(state=>state.auth.password);
    const dispatch = useAppDispatch();
    const errorLogin = useAppSelector(state=>state.auth.errorLogin);
    const errorPass = useAppSelector(state=>state.auth.errorPass);
    const isAuth = useAppSelector(state=> state.auth.infoUser.isAuth);
    const Navigate = useNavigate();
    const errorAuth = useAppSelector(state=> state.auth.error);

    useEffect(()=> {
        if (isAuth) {
            Navigate('/');
        }
    })

    const onClickLogin = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const data:IDataUser = {
            login: login,
            password: password
        }
        dispatch(authorization(data));
    }
    const onClickRemoveError = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(removeError())
    }

    return (<div className={'relative font-medium shadow-2xl max-w-xs min-h-min mx-auto rounded-md border-indigo-500/100 content-center border-4'}>
        {errorAuth &&
            <div className={'absolute w-full h-full bg-slate-500'}>
                <div className={'text-sky-50 mt-10 mx-10 font-bold'}>
                    <div>'{errorAuth}'</div>
                    <div>Произошла ошибка авторизации,логин или пароль введён неправильно, попробуйте снова, в случае ошибки обратитесь в службу поддержки support@bestmarket.net</div>
                </div>
                <div className={'text-sky-50 flex justify-center mt-5 font-bold'}>
                    <button onClick={onClickRemoveError} className={'border-double border-4 border-sky-500 p-1.5 bg-sky-600 rounded-md hover:bg-gradient-to-r from-pink-500 to-violet-500'}>Попробовать снова</button>
                </div>
            </div>
        }
        <div className={'grid justify-items-center'}>
            <div>
                <div className={'text-neutral-700 mt-6'}>Login</div>
                <input onBlur={()=> dispatch(checkLogin())}
                       value={login}
                       onChange={e => dispatch(updateLogin(e.target.value))} className={'mt-2 border-indigo-500/100 rounded-md border-4'} type={"text"}/></div>
            {errorLogin && <ErrorComponent text={'Ошибка! пароль должен содержать только буквы латинского алфавита и цифры!'}/>}
            <div>
                <div className={'text-neutral-700 mt-3'}>Password</div>
                <input onBlur={()=> dispatch(checkPass())}
                       value={password}
                       onChange={e=> dispatch(updatePassword(e.target.value))} className={'mt-2 border-indigo-500/100 rounded-md border-4'} type={"password"} /></div>
            {errorPass && <ErrorComponent text={'Ошибка! пароль должен содержать только буквы латинского алфавита и цифры!'} />}
        </div>
        <div className={'mt-5 ml-14 text-xs'}>Ещё не зарегестрированы?<br/>
            <Link className={'text-blue-600 hover:underline'} to={'/signup'}>Зарегестрироваться</Link>
        </div>
        <div className={'flex flex-row-reverse my-6 mr-14'}>
            <button onClick={onClickLogin}
                disabled={((errorLogin || errorPass) && true) || ((login === '' || password === '') && true)}
                className={'border-double border-4 border-sky-500 p-1.5 bg-sky-600 rounded-md hover:bg-gradient-to-r from-pink-500 to-violet-500 disabled:bg-gray-600'}>
                Войти</button></div>
    </div>)
}