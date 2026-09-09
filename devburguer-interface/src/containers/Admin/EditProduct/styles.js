import styled from 'styled-components';

import { Button } from '../../../components/Button';

// O Container e so o palco do card: ocupa a altura util da section do
// AdminLayout (100vh menos os 40px de padding em cima e embaixo) e centraliza
// o formulario nos dois eixos. A altura precisa vir daqui porque a section e
// um bloco comum, que so tem a altura do proprio conteudo.
export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 80px);
`;

// O card do Figma (CADASTRAR_PRODUTO 0:643) e o proprio formulario: 447px de
// largura, 43px de respiro lateral, 49px do topo, 58px na base e 37px entre
// os campos (cada bloco de rotulo + campo tem 86px).
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 100%;
  max-width: 447px;
  padding: 49px 43px 58px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.black};
  box-shadow: 0 0 11px 0 rgba(0, 0, 0, 0.5);
`;

// Sem gap aqui de proposito: o espaco fica nas margens para que a mensagem de
// erro vazia nao empurre o proximo campo.
export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 14px;
    color: ${({ theme }) => theme.white};
    font-size: 18px;
    line-height: 109%;
  }

  input,
  select {
    height: 52px;
    padding: 0 16px;
    border: none;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.white};
    color: ${({ theme }) => theme.mainBlack};
    font-size: 16px;
  }

  select {
    cursor: pointer;
  }
`;

// O input de arquivo fica escondido dentro do label: o visual e a moldura
// tracejada do Figma (0:673) e o clique continua sendo o do input nativo.
// O seletor com [type='file'] vence o 'input' generico do InputGroup.
export const LabelUpload = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 52px;
  border: 1px dashed ${({ theme }) => theme.white};
  border-radius: 5px;
  color: ${({ theme }) => theme.white};
  font-size: 18px;
  line-height: 109%;
  cursor: pointer;
  transition:
    border-color 0.3s ease,
    color 0.3s ease;

  svg {
    flex-shrink: 0;
    width: 24px;
    height: 24px;
  }

  &:hover {
    border-color: ${({ theme }) => theme.purple};
    color: ${({ theme }) => theme.purple};
  }

  input[type='file'] {
    display: none;
  }
`;

export const ErrorMessage = styled.p`
  margin-top: 6px;
  color: ${({ theme }) => theme.darkRed};
  font-size: 14px;
  font-weight: 600;
  line-height: 100%;
`;

// Reaproveita o botao roxo do projeto; do Figma (0:670) vem so a altura de
// 57px e a tipografia Poppins, no lugar da Road Rage usada no restante do app.
export const SubmitButton = styled(Button)`
  height: 57px;
  margin-top: 46px;
  font-family: ${({ theme }) => theme.poppinsFont};
  font-size: 18px;
  font-weight: 600;
  line-height: 109%;
`;
