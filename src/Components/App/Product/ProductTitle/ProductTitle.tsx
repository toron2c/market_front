import {useAppSelector} from "../../../../hook/hooks";


export default function ProductTitle() {
    const title:string = useAppSelector(state=>state.product.product.name)
    return (<div className={'font-bold text-4xl flex justify-center'}>
        <div>{title && title}</div>
    </div>)
}