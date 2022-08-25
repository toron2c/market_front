import {useAppSelector} from "../../../../hook/hooks";


export default function ProductDescription() {
    const description = useAppSelector(state=> state.product.product.description);

    return (<div className={'mt-14'}>
        {description && <p className={'font-medium text-lg'}>{description}</p>}
    </div>)
}