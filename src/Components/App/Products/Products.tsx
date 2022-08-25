import {useAppDispatch, useAppSelector} from "../../../hook/hooks";
import {ProductItem} from "./ProductItem/ProductItem";
import {useEffect} from "react";
import {getCart} from "../../../redux/cartSlice";



export default function Products() {
    const Products = useAppSelector(state=> state.products.list);
    const isAuth = useAppSelector(state=>state.auth.infoUser.isAuth);
    const userId = useAppSelector(state=>state.auth.infoUser.id);
    const dispatch = useAppDispatch()
    useEffect(()=> {
        if (isAuth && userId) {
            dispatch(getCart(userId));
        }
    },[isAuth, userId, dispatch]);

    const list = Products.map((el, idx)=> <ProductItem id={el.id} key={idx}/>)
    return (<div className={'lg:mx-40 mt-16 grid lg:grid-cols-5 gap-5 sm:grid-cols-1 sm:mx-0'}>
        {Products && list}
    </div>)
}