import {useAppSelector} from "../../../../hook/hooks";


export default function ProductCount() {
    const count = useAppSelector(state=>state.product.product.count);
    return <div className={'my-9 grid justify-items-center font-medium'}>
        <div>
            {count && <div>Остаток на складе: {count}</div>}
        </div>
    </div>
}