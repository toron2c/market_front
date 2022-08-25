import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../hook/hooks";
import {getProduct} from "../../../redux/ProductSlice";
import ProductTitle from "./ProductTitle/ProductTitle";
import ProductDescription from "./ProductDescription/ProductDescription";
import ProductPrice from "./ProductPrice/ProductPrice";
import ProductCount from "./ProductCount/ProductCount";
import {
    ProductItemControllerAuth
} from "../Products/ProductItem/ProductItemController/ProductItemControllerAuth/ProductItemControllerAuth";
import {ProductItemController} from "../Products/ProductItem/ProductItemController/ProductItemController";


export const Product:React.FC = () => {
    let {id} = useParams();
    const dispatch = useAppDispatch();
    const product = useAppSelector(state=> state.product.product);
    const isAuth:boolean = useAppSelector(state=> state.auth.infoUser.isAuth);
    const inCart:boolean = useAppSelector(state=>state.cart.list.some((el) => el.product_id === product.id));

    useEffect(()=> {
        if (id) {
            dispatch(getProduct(id))
        }
    }, [id, dispatch])

    return (<div className={'lg:mx-40 sm:w-screen lg:w-9/12 border-4 border-blue-600 my-auto rounded-2xl'}>
        <div className={'mt-5'}>
            {id && <ProductTitle />}
            <div className={'flex justify-around'}>
                <div className={'w-2/4'}>
                    <img className={' h-4/7 max-w-2/4'} src={`http://192.168.0.103:6565/img/${product.url_img}`} alt={product.name} />
                </div>
                <div className={'w-2/4 mx-5'}>
                    <ProductDescription/>
                    <div className={'mt-32'}><ProductPrice/></div>
                    {
                        id && <div>{(isAuth && inCart) ? <ProductItemControllerAuth id={product.id} /> :  <ProductItemController id={product.id}/>}</div>
                    }
                    <ProductCount/>
                </div>

            </div>
        </div>
    </div>)
}