import React from "react";
import {IIdProduct} from "../../../../Products/ProductItem/ProductItem";
import {useAppSelector} from "../../../../../../hook/hooks";


export const CartProductItemDescr:React.FC<IIdProduct> = ({id}) => {
    const el = useAppSelector(state=>state.cart.list.find(el => el.product_id === id))
    return (<div className={'my-auto mx-10 w-2/6'}>
        <div className={'mb-3 font-medium'}>{el && el.infoCartElement.name}</div>
        <div>{el && el.infoCartElement.description}...</div>
        <div className={'my-3 font-medium'}>Цена: <span className={'font-light'}>{el&& el.infoCartElement.price}</span></div>
    </div>)
}