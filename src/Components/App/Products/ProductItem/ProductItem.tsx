import React from "react";
import {IProduct} from "../../../../redux/productsSlice";
import {useAppSelector} from "../../../../hook/hooks";
import {NavLink} from "react-router-dom";
import {ProductItemController} from "./ProductItemController/ProductItemController";
import {ProductItemControllerAuth} from "./ProductItemController/ProductItemControllerAuth/ProductItemControllerAuth";

export interface IIdProduct {
    id: string
}

export const ProductItem:React.FC<IIdProduct> = ({id}) => {
    const element = useAppSelector(state=>state.products.list.find((el:IProduct) => el.id === id))
    const isAuth = useAppSelector(state=>state.auth.infoUser.isAuth);
    const inCart:boolean = useAppSelector(state=>state.cart.list.some((el) => el.product_id === id))
    return (<div className={'border-4 rounded-2xl border-violet-700 grid grid-cols-1 gap-1'}>
        {element && <NavLink className={'col-start-1 col-span-7'} to={`products/${id}`}>
            <div >
                <div className={'mx-auto'}>
                    <img className={'max-w-full max-h-16 mx-auto'} src={`http://192.168.0.103:6565/img/${element.url_img}`} alt={element.name} />
                </div>
            </div>
        </NavLink>}
        {element && <div className={'col-start-1 col-span-7 text-center font-semibold mt-5'}>{element.name}</div>}
        {element && <div className={'col-start-1 col-span-7 flex justify-center font-bold'}>Цена:<div className={' ml-5 font-semibold'}>{element.price}</div></div>}
        {element && <div className={'col-start-1 col-span-7'}>
            {
                isAuth && inCart ? <ProductItemControllerAuth id={element.id} /> : <ProductItemController id={element.id}/>
            }
        </div>}
        {element && <div className={'col-end-7 col-span-1 text-xs'}><div className={''}>Остаток на складе: {element.count}</div></div>}
    </div>)
}