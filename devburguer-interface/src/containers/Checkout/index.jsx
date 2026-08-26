import { useLocation } from "react-router-dom"

export function Checkout(){
    const location = useLocation()
    
    return(
        <h1>Checkout</h1>
    )
}