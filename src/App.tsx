import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "./hook/hooks";
import {getProducts} from "./redux/productsSlice";
import {Route, Routes} from "react-router-dom";
import Menu from "./Components/Menu/Menu";
import Login from "./Components/App/Login/Login";
import Signup from "./Components/App/Signup/Signup";
import Products from "./Components/App/Products/Products";
import ErrorPage from "./Components/App/ErrorPage/ErrorPage";
import {Product} from "./Components/App/Product/Product";

const Cart = React.lazy(()=> import('./Components/App/Cart/Cart'))

function App() {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(state=> state.auth.infoUser.isAuth);

  useEffect(()=>{

  dispatch(getProducts());

  },[dispatch])

  return (
    <div className={''}>
      <Routes>
          <Route path={'/'} element={<Menu/>}>
            <Route index element={<Products />} />
              <Route path={'/orders'} element={isAuth ? <div>Order</div> : <Login />}/>
              <Route path={'/login'} element={<Login />}/>
              <Route path={'/signup'} element={<Signup/>}/>
              <Route path={'/cart'} element={isAuth ? <React.Suspense><Cart/></React.Suspense> : <Login />} />
              <Route path={'products/:id'} element={<Product />} />
              <Route path={'*'} element={<ErrorPage />} />
          </Route>
      </Routes>
    </div>
  );
}

export default App;
