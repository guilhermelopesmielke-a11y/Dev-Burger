import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import {
  CheckSquareIcon,
  MagnifyingGlassIcon,
  PencilSimpleIcon,
  SquareIcon,
} from '@phosphor-icons/react';

import { Table } from '../../../components';
import { api } from '../../../services/api';
import { formatedPrice } from '../../../utils/formatPrice';
import {
  Container,
  EditButton,
  Message,
  OfferStatus,
  ProductImage,
  SearchBar,
} from './styles';

export function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function loadProducts() {
      const { data } = await api.get('/products');
      setProducts(data);
    }

    loadProducts();
  }, []);

  // A busca filtra na renderizacao, sem estado proprio: assim ela acompanha a
  // lista que veio da API sem precisar manter duas listas em sincronia.
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  function editProduct(product) {
    navigate(`/admin/editar-produto`, {state: { product }});
  }

  return (
    <Container>
      <SearchBar>
        <input
          type="text"
          placeholder="Pesquisar produto"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <MagnifyingGlassIcon />
      </SearchBar>

      <Table.Root>
        <Table.Header>
          <Table.Tr>
            <Table.Th>Nome</Table.Th>
            <Table.Th>Preço</Table.Th>
            <Table.Th>Produto em oferta</Table.Th>
            <Table.Th>Imagem do produto</Table.Th>
            <Table.Th>Editar</Table.Th>
          </Table.Tr>
        </Table.Header>
        <Table.Body>
          {filteredProducts.length ? (
            filteredProducts.map((product) => (
              <Table.Tr key={product.id}>
                <Table.Td>{product.name}</Table.Td>
                <Table.Td>{formatedPrice(product.price)}</Table.Td>
                <Table.Td>
                  <OfferStatus $isOffer={product.offers}>
                    {product.offers ? (
                      <CheckSquareIcon weight="fill" />
                    ) : (
                      <SquareIcon />
                    )}
                  </OfferStatus>
                </Table.Td>
                <Table.Td>
                  <ProductImage src={product.url} alt={product.name} />
                </Table.Td>
                <Table.Td>
                  <EditButton type="button" onClick={() => editProduct(product)}>
                    <PencilSimpleIcon />
                  </EditButton>
                </Table.Td>
              </Table.Tr>
            ))
          ) : (
            <Table.Tr>
              <Table.Td colSpan={5}>
                <Message>Nenhum produto encontrado</Message>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Body>
      </Table.Root>
    </Container>
  );
}
