import {useAppSelector} from "../../../../hook/hooks";
import {CartProductItem} from "./CartProductItem/CartProductItem";


export default function CartProduct() {
    const cartItems = useAppSelector(state=> state.cart.list);
    const list = cartItems.map((el, idx) => <CartProductItem key={idx} id={el.product_id} />)

    return (<div>
        {list && list}
    </div>)
}