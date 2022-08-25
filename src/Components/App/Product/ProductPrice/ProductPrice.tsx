import {useAppSelector} from "../../../../hook/hooks";


export default function ProductPrice() {
    const price = useAppSelector(state=> state.product.product.price);
    return (<div className={'flex justify-around mb-8'}>
        <div className={'font-bold'}>Цена:</div>
        {price && price}
    </div>)
}