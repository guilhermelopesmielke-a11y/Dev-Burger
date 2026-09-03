import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Table } from '../../../components';
import { api } from '../../../services/api';
import { orderStatusOptions } from './orderStatus';
import { Row } from './row';
import { Container, Filter, FilterOption, Message } from './styles';

export function Orders() {
  const [orders, setOrders] = useState([]);
  const [activeStatusId, setActiveStatusId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      try {
        const { data } = await api.get('/orders');
        setOrders(data);
      } catch {
        toast.error('Falha ao carregar os pedidos');
      } finally {
        setIsLoading(false);
      }
    }

    loadOrders();
  }, []);

  // A lista filtrada e calculada na renderizacao, e nao guardada num estado
  // proprio: assim trocar o status de um pedido (que mexe em 'orders') ja
  // reflete no filtro atual sem precisar sincronizar dois estados.
  const activeStatus = orderStatusOptions.find(
    (status) => status.id === activeStatusId,
  ).value;

  const filteredOrders = activeStatus
    ? orders.filter((order) => order.status === activeStatus)
    : orders;

  return (
    <Container>
      <Filter>
        {orderStatusOptions.map((status) => (
          <FilterOption
            key={status.id}
            $isActive={status.id === activeStatusId}
            onClick={() => setActiveStatusId(status.id)}
          >
            {status.label}
          </FilterOption>
        ))}
      </Filter>

      <Table.Root>
        <Table.Header>
          <Table.Tr>
            <Table.Th />
            <Table.Th>Pedido</Table.Th>
            <Table.Th>Cliente</Table.Th>
            <Table.Th>Data do pedido</Table.Th>
            <Table.Th>Status</Table.Th>
          </Table.Tr>
        </Table.Header>
        <Table.Body>
          {isLoading ? (
            <Table.Tr>
              <Table.Td colSpan={5}>
                <Message>Carregando pedidos...</Message>
              </Table.Td>
            </Table.Tr>
          ) : filteredOrders.length ? (
            filteredOrders.map((order) => (
              <Row key={order._id} order={order} setOrders={setOrders} />
            ))
          ) : (
            <Table.Tr>
              <Table.Td colSpan={5}>
                <Message>Nenhum pedido encontrado</Message>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Body>
      </Table.Root>
    </Container>
  );
}
