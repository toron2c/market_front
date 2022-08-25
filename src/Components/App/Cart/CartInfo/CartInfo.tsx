import {useAppDispatch, useAppSelector} from "../../../../hook/hooks";
import React, {useEffect} from "react";
import {
    createOrder,
    getCart,
    IElementOrder,
    IPostOrder,
    setCountProducts,
    setTotalPrice
} from "../../../../redux/cartSlice";


export default function CartInfo() {
    const cart = useAppSelector(state=> state.cart);
    const CountProducts = useAppSelector(state=>state.cart.countProducts);
    const totalPrice = useAppSelector(state=> state.cart.totalPrice);
    const userId =  useAppSelector(state=>state.auth.infoUser.id);
    let dataProducts:IElementOrder[] = cart.list.map((el)=> {
        return {
            id: el.product_id,
            count: el.countProduct
        };
    })
    const onClickButtonCreateOrder = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if ((dataProducts.length !== 0) && userId) {
            let data:IPostOrder = {
                idUser: userId,
                products: dataProducts
            }
            dispatch(createOrder(data));
            dispatch(getCart(userId));
        }
    }

    const dispatch = useAppDispatch();

    useEffect(()=> {
        if (cart.list) {
            dispatch(setTotalPrice());
            dispatch(setCountProducts());
        }
    }, [cart.list, dispatch])

    return <div className={'min-w-max p-10 m-5 border-4 rounded-2xl shadow-2xl border-blue-500'}>
        <div className={'my-5'}><button onClick={onClickButtonCreateOrder} className={'block mx-auto p-3 rounded-2xl border-4 border-blue-700 hover:text-cyan-50 hover:bg-gradient-to-r text-indigo-900 hover:from-pink-500 hover:to-violet-500'}>Создать заказ</button></div>
        {cart && <div className={'my-5 font-medium'}>Количество товаров: {CountProducts}</div>}
        {cart && <div className={'my-5 font-medium'}>Итоговая сумма: {totalPrice}</div>}
    </div>
}

