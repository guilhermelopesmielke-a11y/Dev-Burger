import { useRef } from "react";
import { CartButton } from "../CartButton";
import { CardImage, Container } from "./styles";
import { formatedPrice } from "../../utils/formatPrice";
import { useCart } from "../../hooks/CartContext";
import { useCartAnimation } from "../../hooks/CartAnimationContext";

export function CardProduct({ product }) {

    const{putProductInCart} = useCart()
    const {flyToCart} = useCartAnimation()

    // A imagem do card e a origem do voo: e ela que o clone copia e de onde
    // saem as coordenadas iniciais.
    const imageRef = useRef(null)

    function handleAddToCart() {
        flyToCart(imageRef.current, product.url)
        putProductInCart(product)
    }

    return (
        <Container>
            <CardImage ref={imageRef} src={product.url} alt={product.name} />
            <div>
                <p>{product.name}</p>
                <strong>R$ {formatedPrice(product.price)}</strong>
            </div>
            <CartButton onClick={handleAddToCart} />
        </Container>
    );
}
