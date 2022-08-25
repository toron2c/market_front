import React from "react";
import {IIdProduct} from "../../ProductItem";
import {IPutData, putCart} from "../../../../../../redux/cartSlice";
import {useAppDispatch, useAppSelector} from "../../../../../../hook/hooks";


export const ProductItemControllerAuth:React.FC<IIdProduct> = ({id}) => {
    const el = useAppSelector(state=>state.cart.list.find(el=> el.product_id === id));
    const idUser = useAppSelector(state=>state.auth.infoUser.id);
    const dispatch = useAppDispatch();


    const onClickAddButton = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (el) {
            let data:IPutData = {
                id: idUser,
                product_id: el.product_id,
                action: 'increment'
            }
            dispatch(putCart(data));

        }

    }
    const onClickRemoveButton = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (el) {
            let data:IPutData = {
                id: idUser,
                product_id: el.product_id,
                action: 'decrement'
            }
            dispatch(putCart(data));
        }

    }


    return (<div className={'flex justify-center my-3'}>
            <div><button onClick={onClickRemoveButton} className={'border-2 rounded-xl py-1 px-2 border-fuchsia-300 hover:bg-gradient-to-r text-indigo-900 hover:from-pink-500 hover:to-violet-500'}>-</button></div>
            <div className={'mx-3 my-auto'}>{el && el.countProduct}</div>
            <div><button onClick={onClickAddButton} className={'border-2 rounded-xl py-1 px-2 border-fuchsia-300 hover:bg-gradient-to-r text-indigo-900 hover:from-pink-500 hover:to-violet-500'}>+</button></div>
        </div>)
}