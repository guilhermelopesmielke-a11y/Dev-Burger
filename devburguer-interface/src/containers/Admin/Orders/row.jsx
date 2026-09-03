import { Fragment, useId, useState } from 'react';
import { toast } from 'react-toastify';

import Collapse from '@mui/material/Collapse';
import { CaretDown, CaretUp } from '@phosphor-icons/react';

import { Table } from '../../../components';
import { api } from '../../../services/api';
import { formatedPrice } from '../../../utils/formatPrice';
import { orderStatusOptions } from './orderStatus';
import {
  ExpandButton,
  ProductImage,
  ProductItem,
  ProductsList,
  Select,
} from './styles';

const formatDate = (value) =>
  new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(value));

export function Row({ order, setOrders }) {
  const [open, setOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const detailsId = useId();

  async function handleStatusChange(newStatus) {
    if (newStatus === order.status) {
      return;
    }

    setIsUpdating(true);

    try {
      await api.put(`/orders/${order._id}`, { status: newStatus });

      // O estado vive no componente pai porque os filtros do topo leem a
      // mesma lista: atualizar so aqui deixaria o filtro "Preparando"
      // mostrando um pedido que ja virou "Pronto".
      setOrders((orders) =>
        orders.map((currentOrder) =>
          currentOrder._id === order._id
            ? { ...currentOrder, status: newStatus }
            : currentOrder,
        ),
      );

      toast.success(`Pedido atualizado para "${newStatus}"`);
    } catch {
      toast.error('Falha ao atualizar o status do pedido');
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <Fragment>
      <Table.Tr>
        <Table.Td>
          <ExpandButton
            type="button"
            aria-label={open ? 'Recolher itens' : 'Ver itens do pedido'}
            aria-expanded={open}
            aria-controls={detailsId}
            onClick={() => setOpen(!open)}
          >
            {open ? <CaretUp size={20} /> : <CaretDown size={20} />}
          </ExpandButton>
        </Table.Td>
        <Table.Td>{order._id}</Table.Td>
        <Table.Td>{order.user.name}</Table.Td>
        <Table.Td>{formatDate(order.createdAt)}</Table.Td>
        <Table.Td>
          <Select
            value={order.status}
            disabled={isUpdating}
            aria-label={`Status do pedido ${order._id}`}
            onChange={(event) => handleStatusChange(event.target.value)}
          >
            {/* O primeiro item da lista e o filtro "Todos", que nao e um
                status gravavel — por isso o filter pelo value. */}
            {orderStatusOptions
              .filter((status) => status.value)
              .map((status) => (
                <option key={status.id} value={status.value}>
                  {status.label}
                </option>
              ))}
          </Select>
        </Table.Td>
      </Table.Tr>
      <Table.Tr id={detailsId} aria-hidden={!open ? true : undefined}>
        {/* padding zerado para a linha recolhida nao ocupar altura nenhuma */}
        <Table.Td colSpan={5} style={{ paddingTop: 0, paddingBottom: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <ProductsList>
              {order.products.map((product) => (
                <ProductItem key={product.id}>
                  <ProductImage src={product.url} alt={product.name} />
                  <div>
                    <strong>
                      {product.quantity}x {product.name}
                    </strong>
                    <span>
                      {' '}
                      — {formatedPrice(product.price * product.quantity)}
                    </span>
                    <br />
                    <span>{product.category}</span>
                  </div>
                </ProductItem>
              ))}
            </ProductsList>
          </Collapse>
        </Table.Td>
      </Table.Tr>
    </Fragment>
  );
}
