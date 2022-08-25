import React, {useEffect} from "react";
import {IIdProduct} from "../../../Products/ProductItem/ProductItem";
import {useAppDispatch, useAppSelector} from "../../../../../hook/hooks";
import {CartProductItemDescr} from "./CartProductItemDescr/CartProductItemDescr";
import {CartProductItemController} from "./CartProductItemController/CartProductItemController";


export const  CartProductItem:React.FC<IIdProduct> = ({id}) => {
    let el = useAppSelector(state=>state.cart.list.find(el=> el.product_id === id));

    useEffect(()=> {

    },[el]);

    return (<div className={'w-11/12 lg:flex m-5 border-4 border-blue-600 shadow-2xl rounded-xl justify-between'}>
        {el && <div className={'w-1/6 m-2'}><img src={`http://192.168.0.103:6565/img/${el.infoCartElement.url_img}`} alt={el.infoCartElement.name}/></div>}
        {el && <CartProductItemDescr id={el.product_id}/>}
        {el && <CartProductItemController id={el.product_id} />}
    </div>)
}