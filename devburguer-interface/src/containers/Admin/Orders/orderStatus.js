// Lista unica de status, usada em dois lugares: os filtros no topo da tabela
// e o select de cada linha. Manter em um arquivo so evita que os textos
// divirjam entre os dois — o back-end grava exatamente a string do 'value',
// entao qualquer diferenca de acento cria um status novo sem querer.
//
// 'Todos' existe apenas como filtro (value null), por isso o select da linha
// despreza o primeiro item da lista.
export const orderStatusOptions = [
  { id: 0, label: 'Todos', value: null },
  { id: 1, label: 'Pedido realizado', value: 'Pedido realizado' },
  { id: 2, label: 'Preparando', value: 'Preparando' },
  { id: 3, label: 'Pronto', value: 'Pronto' },
  { id: 4, label: 'Entregue', value: 'Entregue' },
];
