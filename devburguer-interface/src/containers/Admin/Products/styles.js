import styled from 'styled-components';

// Metricas do Figma (LISTAR_PRODUTOS 0:723): a busca e a tabela ocupam a mesma
// largura e ficam separadas por 22px.
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
  width: 100%;

  /* A tabela e o componente compartilhado (o mesmo da tela de Pedidos). Aqui
     so entram a tipografia de 12px e as linhas divisorias que esta tela pede
     no Figma, sem mexer no componente e quebrar as outras telas. */
  th,
  td {
    font-size: 12px;
    letter-spacing: 0.84px;
  }

  th {
    font-weight: 700;
    /* No Figma cada titulo ocupa uma linha so. */
    white-space: nowrap;
  }

  td {
    font-weight: 300;
    color: ${({ theme }) => theme.mainBlack};
  }

  tbody tr:not(:last-child) td {
    border-bottom: 1px solid ${({ theme }) => theme.lightGray};
  }
`;

// Campo de busca 0:751: 51px de altura, cantos de 20px, borda cinza e a lupa
// encostada na ponta direita.
export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  height: 51px;
  padding: 0 24px;
  border: 1px solid ${({ theme }) => theme.gray};
  border-radius: 20px;
  background-color: ${({ theme }) => theme.white};

  input {
    flex: 1;
    border: none;
    background: none;
    color: ${({ theme }) => theme.mainBlack};
    font-size: 20px;

    &::placeholder {
      color: ${({ theme }) => theme.gray};
      font-weight: 300;
      font-style: italic;
    }
  }

  svg {
    flex-shrink: 0;
    width: 24px;
    height: 24px;
    color: ${({ theme }) => theme.darkGray};
  }
`;

// Imagem 0:814: 70x63 no Figma. A moldura fixa com object-fit deixa PNG e JPEG
// com o mesmo enquadramento, pelo mesmo motivo do CardProduct.
export const ProductImage = styled.img`
  display: block;
  width: 70px;
  height: 63px;
  object-fit: cover;
  border-radius: 8px;
`;

// No Figma a coluna "Produto em oferta" e um checkbox: verde marcado quando o
// produto esta em oferta, quadrado vazio quando nao esta. Por enquanto e so
// leitura, entao um icone basta.
export const OfferStatus = styled.span`
  display: inline-flex;

  svg {
    width: 24px;
    height: 24px;
    color: ${({ theme, $isOffer }) => ($isOffer ? theme.gren : theme.darkGray)};
  }
`;

export const EditButton = styled.button`
  display: inline-flex;
  padding: 4px;
  border: none;
  background: none;
  color: ${({ theme }) => theme.secondBlack};
  cursor: pointer;
  transition: color 0.3s ease;
  border-radius: 8px;

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.purple};

    svg{
        fill: ${({ theme }) => theme.white};
    }
  }
`;

export const Message = styled.p`
  padding: 24px 0;
  color: ${({ theme }) => theme.darkGray};
  font-size: 14px;
  font-weight: 500;
  text-align: center;
`;
