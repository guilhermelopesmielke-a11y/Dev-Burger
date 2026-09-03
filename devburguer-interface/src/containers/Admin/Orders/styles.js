import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

// Os filtros ficam numa <ul> porque sao uma lista de opcoes, nao navegacao.
export const Filter = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  list-style: none;
`;

// O filtro ativo herda a cor roxa do tema e ganha o sublinhado; os demais
// ficam cinza. A borda transparente nos inativos reserva o espaco do
// sublinhado, senao a linha inteira pula 2px a cada troca de filtro.
export const FilterOption = styled.li`
  padding-bottom: 4px;
  color: ${({ theme, $isActive }) => ($isActive ? theme.purple : theme.gray)};
  font-size: 17px;
  font-weight: ${({ $isActive }) => ($isActive ? 600 : 400)};
  border-bottom: 2px solid
    ${({ theme, $isActive }) => ($isActive ? theme.purple : 'transparent')};
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: ${({ theme }) => theme.purple};
  }
`;

export const ProductImage = styled.img`
  height: 80px;
  width: 80px;
  border-radius: 16px;
  object-fit: cover;
`;

// Lista dos itens do pedido, exibida dentro da linha expandida.
export const ProductsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 0;
  list-style: none;
`;

export const ProductItem = styled.li`
  display: flex;
  align-items: center;
  gap: 16px;

  strong {
    font-weight: 600;
  }

  span {
    color: ${({ theme }) => theme.gray};
    font-size: 14px;
  }
`;

export const Message = styled.p`
  padding: 32px 16px;
  color: ${({ theme }) => theme.gray};
  font-size: 18px;
  text-align: center;
`;

export const ExpandButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  width: 32px;
  color: ${({ theme }) => theme.secondBlack};
  background-color: transparent;
  border: none;
  border-radius: 50%;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.darkWhite};
  }
`;

// <select> nativo em vez de biblioteca: sao 4 opcoes fixas, e o nativo ja
// vem com teclado e leitor de tela funcionando. 'appearance: none' remove a
// seta padrao do sistema para a seta do tema aparecer via background-image.
export const Select = styled.select`
  padding: 8px 32px 8px 12px;
  color: ${({ theme }) => theme.secondBlack};
  font-family: inherit;
  font-size: 15px;
  font-weight: 500;
  background-color: ${({ theme }) => theme.white};
  border: 1px solid ${({ theme }) => theme.lightGray};
  border-radius: 8px;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'%3E%3Cpath fill='%23625e5e' d='M213.7 101.7l-80 80a8 8 0 01-11.4 0l-80-80A8 8 0 0148 88h160a8 8 0 015.7 13.7z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 16px;
  cursor: pointer;
  transition: border-color 0.3s;

  &:hover {
    border-color: ${({ theme }) => theme.purple};
  }

  &:focus-visible {
    border-color: ${({ theme }) => theme.purple};
  }

  &:disabled {
    color: ${({ theme }) => theme.gray};
    cursor: progress;
  }
`;

// O _id do Mongo tem 24 caracteres e estourava a largura da tabela, empurrando
// a coluna de status para fora da tela. Mostramos so o final — que ja identifica
// o pedido no dia a dia — e deixamos o id inteiro no title, para copiar quando
// for preciso procurar direto no banco.
export const OrderId = styled.span`
  font-family: monospace;
  font-size: 15px;
  white-space: nowrap;
  cursor: help;
`;

export const OrderDate = styled.span`
  white-space: nowrap;
`;
