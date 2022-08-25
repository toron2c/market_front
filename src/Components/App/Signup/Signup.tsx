import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../hook/hooks";
import {
    checkLogin,
    checkPass, checkRepeat, IDataUser, registration, removeError,
    updateLogin,
    updatePassword,
    updateRepeatPassword
} from "../../../redux/authSlice";
import ErrorComponent from "./ErrorComponent/ErrorComponent";
import React, {useEffect} from "react";

export default function Signup() {
    const dispatch = useAppDispatch();
    const login = useAppSelector(state=>state.auth.login);
    const password = useAppSelector(state=>state.auth.password);
    const repeatPass = useAppSelector(state=>state.auth.repeatPass);
    const errorLogin = useAppSelector(state=>state.auth.errorLogin);
    const errorPass = useAppSelector(state=>state.auth.errorPass);
    const errorRepeat = useAppSelector(state=>state.auth.errorRepeat);
    const isAuth = useAppSelector(state=> state.auth.infoUser.isAuth);
    const Navigate = useNavigate();
    const errorAuth = useAppSelector(state=>state.auth.error);
    useEffect(()=> {
        if (isAuth) {
            Navigate('/');
        }
    })

    const onClickRegistration = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const data:IDataUser = {
            login: login,
            password: password
        }
        dispatch(registration(data));

    }
    const onClickRemoveError = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(removeError())
    }
    return (
        <div className={'relative font-medium shadow-2xl max-w-xs min-h-min mx-auto rounded-md border-indigo-500/100 content-center border-4'}>
            {errorAuth &&
                <div className={'absolute w-full h-full bg-slate-500'}>
                    <div className={'text-sky-50 mt-10 mx-10 font-bold'}>
                        <div>'{errorAuth}'</div>
                        <div>Произошла ошибка регистрации, возможно данный логин уже занят, попробуйте снова, в случае ошибки обратитесь в службу поддержки support@bestmarket.net</div>
                    </div>
                    <div className={'text-sky-50 flex justify-center mt-5 font-bold'}>
                        <button onClick={onClickRemoveError} className={'border-double border-4 border-sky-500 p-1.5 bg-sky-600 rounded-md hover:bg-gradient-to-r from-pink-500 to-violet-500'}>Попробовать снова</button>
                    </div>
                </div>
            }
            <div className={'grid justify-items-center'}>
                <div>
                    <div  className={'text-neutral-700 mt-3'}>Login</div>
                    <input onBlur={()=> dispatch(checkLogin())}
                           onChange={(e)=>dispatch(updateLogin(e.target.value))}
                           value={login}
                           className={'mt-2 border-indigo-500/100 rounded-md border-4'} type={"text"}/></div>
                {errorLogin && <ErrorComponent text={'Ошибка! логин должен содержать только буквы латинского алфавита и цифры!'} />}
                <div>
                    <div className={'text-neutral-700'}>Password</div>
                    <input value={password}
                           onBlur={()=>dispatch(checkPass())}
                           onChange={(e)=>dispatch(updatePassword(e.target.value))}
                           className={'mt-2 border-indigo-500/100 rounded-md border-4'} type={"password"} /></div>
                {errorPass && <ErrorComponent text={'Ошибка! пароль должен содержать только буквы латинского алфавита и цифры!'} />}
                <div>
                    <div className={'text-neutral-700'}>repeat password</div>
                    <input value={repeatPass}
                           onBlur={()=>dispatch(checkRepeat())}
                           onChange={e=> dispatch(updateRepeatPassword(e.target.value))}
                           className={'mt-2 border-indigo-500/100 rounded-md border-4'} type={"password"}/></div>
                {errorRepeat && <ErrorComponent text={"Ошибка! введеные пароли не совпадают!"} />}
            </div>
            <div className={'ml-14 text-xs'}>Уже зарегестрированы?<br/><Link className={'text-blue-600 hover:underline'} to={'/login'}>Войти</Link></div>

            <div className={'flex flex-row-reverse my-8 mr-14'}>
                {/* eslint-disable-next-line no-mixed-operators */}
                <button disabled={((errorRepeat || errorLogin || errorPass) && true) || (login === '' || password === '' || repeatPass === '') && true}
                        onClick={(e)=>onClickRegistration(e)}
                        className={'border-double border-4 border-sky-500 p-1.5 bg-sky-600 rounded-md hover:bg-gradient-to-r from-pink-500 to-violet-500 disabled:bg-gray-600 '}>Войти</button></div>
        </div>)
}