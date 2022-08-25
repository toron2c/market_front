import {IIdProduct} from "../../../../Products/ProductItem/ProductItem";
import React from "react";
import {useAppDispatch, useAppSelector} from "../../../../../../hook/hooks";
import {IPutData, putCart} from "../../../../../../redux/cartSlice";
import {IId} from "../../../../../../redux/authSlice";


export const CartProductItemController:React.FC<IIdProduct> = ({id}) => {
    const el = useAppSelector(state=> state.cart.list.find(el => el.product_id === id))
    const idUser:IId = useAppSelector(state=>state.auth.infoUser.id);
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

    return (<div className={'my-auto mx-auto flex text-lg w-12'}>
        <div><button onClick={onClickRemoveButton} className={'border-4 shadow-2xl border-blue-600 rounded-2xl m-3 py-1 px-3 text-sky-600'}>-</button></div>
        {el && <div className={'my-5 w-max mx-5'}>{el.countProduct}</div>}
        <div><button onClick={onClickAddButton} className={'border-4 shadow-2xl border-blue-600 rounded-2xl m-3 py-1 px-2.5 text-sky-600   '}>+</button></div>
    </div>)
}