import React from "react";
import {IIdProduct} from "../ProductItem";
import {useAppDispatch, useAppSelector} from "../../../../../hook/hooks";
import {IPostData, postProductToCart} from "../../../../../redux/cartSlice";
import {useNavigate} from "react-router-dom";


export const ProductItemController:React.FC<IIdProduct> = ({id}) => {

    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(state=>state.auth.infoUser.isAuth);
    const userId = useAppSelector(state=>state.auth.infoUser.id);
    const Navigate = useNavigate();

    const onClickButtonAddToCart = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!isAuth) {
            Navigate('/login');
        } else {
            const data:IPostData = {
                id: userId,
                product_id: id
            }
            dispatch(postProductToCart(data))
        }

    }

    return (<div >
        <button onClick={onClickButtonAddToCart} className={'border-4  p-1 mx-auto block my-3 border-fuchsia-300 hover:bg-blue-500 hover:bg-gradient-to-r text-indigo-900 hover:from-pink-500 hover:to-violet-500 rounded-xl mx-auto'}>Добавить в корзину</button>
    </div>)
}