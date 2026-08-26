import { createBrowserRouter } from "react-router-dom";
import { Home, Menu, Cart, Login, Register, Checkout, CompletePayment } from "../containers";
import { Header, Footer } from "../components";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/cadastro",
        element: <Register />
    },
    {
        path: "/home",
        element: (
        <>
            <Header/>
            <Home />
            <Footer></Footer>
        </>    
        )
    },
    {
        path: "/cardapio",
        element:(
        <>
            <Header/>
            <Menu />
        </>    
        )
    },
    {
        path:'/carrinho',
        element:<Cart/>
    },
    {
        path:'/checkout',
        element:<Checkout/>
    },
    {
        path:'/complete',
        element:<CompletePayment/>
    },
])