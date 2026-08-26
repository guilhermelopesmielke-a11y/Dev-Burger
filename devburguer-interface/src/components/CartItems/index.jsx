import { Table } from '../Table'
import { useCart } from '../../hooks/CartContext'
import { formatedPrice } from '../../utils/formatPrice'
import { ButtonGroup, EmptyCart, ProductImage } from './styles'
import Trash from '../../assets/trash.svg'

export function CartItems() {

    const cart = useCart()

    console.log('ESSE É:', cart.cartProducts)

    return (
        <Table.Root>
            <Table.Header>
                <Table.Tr>
                    <Table.Th></Table.Th>
                    <Table.Th>Itens</Table.Th>
                    <Table.Th>Preço</Table.Th>
                    <Table.Th>Quantidade</Table.Th>
                    <Table.Th>Total</Table.Th>
                    <Table.Th></Table.Th>
                </Table.Tr>
            </Table.Header>
            <Table.Body>
                {cart.cartProducts?.length ? (
                    cart.cartProducts.map(product => (
                        <Table.Tr key={product.id}>
                            <Table.Td>
                                <ProductImage src={product.url} alt={product.name}/>
                            </Table.Td>
                            <Table.Td>{product.name}</Table.Td>
                            <Table.Td>{formatedPrice(product.price)}</Table.Td>
                            <Table.Td>
                                <ButtonGroup>
                                    <button onClick={() => cart.decreaseProduct(product.id)}>{product.quantity > 1 ? '-' : (<img src={Trash} alt='Lixeira' style={{width: 20, height:20, cursor: 'pointer'}} />)}</button>
                                {product.quantity}
                                    <button onClick={() => cart.increaseProduct(product.id)}>+</button>
                                </ButtonGroup>
                            </Table.Td>
                            <Table.Td>
                                <div style={{fontWeight: 'bold'}}>
                                    {formatedPrice(product.price * product.quantity)}
                                </div>
                            </Table.Td>
                            <Table.Td><img src={Trash} alt='Lixeira' onClick={() => cart.deleteProduct(product.id)} style={{width: 20, height:20, cursor: 'pointer'}}></img></Table.Td>
                        </Table.Tr>
            ))
            ) : <EmptyCart>carrinho vazio</EmptyCart>}
        </Table.Body>
        </Table.Root >
    )
}