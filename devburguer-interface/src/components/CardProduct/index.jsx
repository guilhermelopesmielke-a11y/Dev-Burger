import { CartButton } from "../CartButton";
import { CardImage, Container } from "./styles";
import { formatedPrice } from "../../utils/formatPrice";
import { useCart } from "../../hooks/CartContext";

export function CardProduct({ product }) {

    const{putProductInCart} = useCart()

    return (
        <Container>
            <CardImage src={product.url} alt={product.name} />
            <div>
                <p>{product.name}</p>
                <strong>R$ {formatedPrice(product.price)}</strong>
            </div>
            <CartButton onClick={() => putProductInCart(product)} />
        </Container>
    );
}

