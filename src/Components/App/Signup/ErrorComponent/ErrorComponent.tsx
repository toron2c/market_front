import React from "react";

interface IErrorProps {
    text:string
}

const ErrorComponent:React.FC<IErrorProps> = ({text}) => {
    return (<div className={'text-[9px] text-red-500 mx-16'}>
        {text}
    </div>)
}

export default ErrorComponent;