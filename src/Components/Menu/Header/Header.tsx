import {useNavigate} from "react-router-dom";
import React from 'react';
export default function Header() {
    const Navigate = useNavigate();
    const handler = () => {
        Navigate('/');
    }
    return (
        <h1 onClick={handler} className="cursor-pointer lg:text-8xl font-bold rounded-lg bg-gradient-to-r my-auto p-5 from-pink-500 to-violet-500 text-5xl ">BestMarket</h1>
   )
}