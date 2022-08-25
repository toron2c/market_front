import Header from "./Header/Header";
import {NavLink, Outlet} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hook/hooks";
import React from "react";
import {logout} from "../../redux/authSlice";


export default function Menu() {

    const styleActiveLink:string = 'ring-2 ring-blue-500/50 ring-offset-4 rounded-lg'
    const isAuth = useAppSelector(state=> state.auth.infoUser.isAuth);
    const dispatch = useAppDispatch();

    const onClickLogout = (e:React.MouseEvent<HTMLButtonElement>) => {
        dispatch(logout());
    }

    return (<div>
        <div className={'lg:flex justify-between'}>
            <Header />
            <nav className={''}>
                <ul className={'flex p-2 mx-auto my-12 shadow-2xl sm:justify-between text-2xl lg:text-3xl font-bold rounded-lg'}>
                    <NavLink className={({isActive}) => isActive ? styleActiveLink : ''}
                             to={'/orders'}>
                        <li className={`p-3 mx-3 bg-gradient-to-r from-pink-500 to-violet-500 rounded-lg sm: mx-1.5`}>Заказы</li>
                    </NavLink>
                    <NavLink className={({isActive}) => isActive ? styleActiveLink : ''}
                             to={'/cart'}><li className={'p-3 mx-3 bg-gradient-to-r from-pink-500 to-violet-500 rounded-lg sm: mx-1.5'}>Корзина</li>
                    </NavLink>
                    {!isAuth &&
                        <NavLink className={({isActive}) => isActive ? styleActiveLink : ''}
                                 to={'/login'}><li className={'p-3 mx-3 bg-gradient-to-r from-pink-500 to-violet-500 rounded-lg sm: mx-1.5'}>Войти</li>
                        </NavLink>}
                    {isAuth && <button onClick={onClickLogout} className={'p-3 mx-3 bg-gradient-to-r from-pink-500 to-violet-500 rounded-lg sm: mx-1.5'}>Выйти</button>}
                </ul>
            </nav>
        </div>
        <Outlet />
    </div>)
}