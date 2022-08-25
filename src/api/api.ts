import axios from 'axios'
import {IId} from "../redux/authSlice";
import {IElementOrder} from "../redux/cartSlice";

const instance =
    axios.create({
        baseURL:'http://192.168.0.103:6565/',
    });


export const apiGetProducts = () => {
    return instance.get('products');
}

export const apiGetProduct = (id:string) => {
    return instance.get(`products/${id}`);
}


export const apiRegistration = (login:string, password:string) => {
    return instance.post('api/user/signup', {
        "login": login,
        "password": password
    })
}

export const apiAuthorization = (login: string, password: string) => {
    return instance.post('api/user/login', {
        "login": login,
        "password": password
    })
}

export const apiGetCart = (id: string) => {
    return instance.get(`api/cart/${id}`);
}

export const apiGetShortInfoProduct = (id: string) => {
    return instance.get(`products/short/${id}`);
}

export const apiChangeCountProduct = (id:IId, product_id:string, action:string) => {
    return instance.put('api/cart', {
        "user_id":id,
        "product_id": product_id,
        "action": action
    })
}

export const apiPostProductToCart = (id:IId, product_id:string) => {
    return instance.post('api/cart', {
        "user_id": id,
        "product_id": product_id
    })
}

export const apiCreateOrder = (list:IElementOrder[], userId:IId) => {
    return instance.post('order/my-orders', {
        "id": userId,
        "products": list
    })
}