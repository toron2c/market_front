import {useAppDispatch, useAppSelector} from "../../../hook/hooks";
import React, {useEffect} from "react";
import {getCart, setStatusCreateOrder, } from "../../../redux/cartSlice";
import CartInfo from "./CartInfo/CartInfo";
import CartProduct from "./CartProduct/CartProduct";
import {useNavigate} from "react-router-dom";


export default function Cart() {
    const dispatch = useAppDispatch();
    const userId = useAppSelector(state=>state.auth.infoUser.id);
    const list = useAppSelector(state=>state.cart.list);
    const Navigate = useNavigate();
    const onClickChangeStatusOrder = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(setStatusCreateOrder())
        Navigate('/');
    }
    const statusCreatedOrder:boolean | null = useAppSelector(state=>state.cart.statusCreateOrder);
    useEffect(() => {
        if (userId) {
            dispatch(getCart(userId));
        }
    },[dispatch, userId, list])
    return (<div className={'relative lg:w-11/12 sm:w-screen mx-auto mt-16 border-4 sm:min-h-min border-blue-600 rounded-2xl lg:flex justify-between'}>
        {list.length === 0 && <div className={'my-auto mx-auto'}>Корзина пуста!</div>}
        {
            statusCreatedOrder &&
            <div className={'border-4 border-blue-600 rounded-2xl absolute bg-blue-500 flex justify-center inset-0'}>
                <p className={'text-cyan-50 font-bold my-auto'}>Готово! Заказ успешно создан!</p>
                <div className={'my-auto mx-5'}><button onClick={onClickChangeStatusOrder} className={'rounded-2xl text-cyan-50 border-4 border-blue-50 p-3 min-h-min'}>Продолжить покупки</button></div></div> }
        <div><CartProduct /></div>
        <div><CartInfo /></div>
    </div>)
}