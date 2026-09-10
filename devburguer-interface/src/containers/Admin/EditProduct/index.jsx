import { useEffect, useState } from 'react';
import { Controller, useForm } from "react-hook-form"
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup"
import { UploadSimpleIcon } from '@phosphor-icons/react';
import * as yup from "yup"
import {api} from '../../../services/api'
import { formatedPrice } from '../../../utils/formatPrice'

import {
  Container,
  ErrorMessage,
  Form,
  InputGroup,
  Label,
  LabelUpload,
  OfferGroup,
  SubmitButton,
} from './styles';

const schema = yup
  .object({
    name: yup.string().required('Digite o nome do produto'),
    price: yup
      .number()
      .positive('O preço deve ser maior que zero')
      .typeError('Digite o preço do produto')
      .required('Digite o preço do produto'),
    category: yup.string().required('Selecione uma categoria'),
    offers: yup.boolean(),
  })

export function EditProduct() {
  const [fileName, setFileName] = useState(null)
  const [categories, setCategories] = useState([])

  const {state: {product}} = useLocation()
  const navigate = useNavigate()
  
  useEffect(() => {
    async function loadCategories() {
      const {data} = await api.get('/categories')
      setCategories(data)
    }
    loadCategories()
  }, [])

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    // Os valores iniciais tem que entrar por aqui, e nao num defaultValue de
    // cada input: preco e categoria sao campos controlados (Controller), e um
    // input controlado ignora o defaultValue do React. O preco ja vem em
    // centavos da API, que e exatamente o que a mascara espera.
    defaultValues: {
      name: product.name,
      price: product.price,
      category: String(product.category_id),
      offers: product.offers,
    },
  })
  const onSubmit = async (data) => {
    const productFormData = new FormData()
    productFormData.append('name', data.name)
    productFormData.append('price', data.price)
    productFormData.append('category_id', data.category)
    productFormData.append('offers', data.offers)

    // Na edicao a imagem e opcional: so entra no envio se o admin escolheu uma
    // nova, senao a API mantem a que ja estava salva.
    if (data.file?.length) {
      productFormData.append('file', data.file[0])
    }

    try {
      await toast.promise(api.put(`/products/${product.id}`, productFormData), {
        pending: 'Atualizando o produto...',
        success: 'Produto atualizado com sucesso',
        error: 'Falha ao atualizar o produto',
      })

      // Volta para a listagem so depois que a API confirmar: se der erro o
      // admin continua nesta tela, com tudo preenchido, para tentar de novo.
      navigate('/admin/produtos')
    } catch {
      // O toast acima ja mostrou a falha para o usuario.
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup>
          <label htmlFor="name">Nome</label>
          <input id="name" type="text" {...register('name')} />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </InputGroup>

        <InputGroup>
          <label htmlFor="price">Preço</label>
          {/* O valor guardado no formulario ja e o inteiro em centavos que o
              banco espera (16 reais -> 1600). A mascara cuida so da exibicao:
              a cada tecla sobram apenas os digitos, e o formatedPrice mostra
              esse total de centavos como moeda. */}
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <input
                id="price"
                type="text"
                inputMode="numeric"
                placeholder="R$ 0,00"
                value={field.value ? formatedPrice(field.value) : ''}
                onChange={(event) =>
                  field.onChange(Number(event.target.value.replace(/\D/g, '')))
                }
              />
            )}
          />
          <ErrorMessage>{errors.price?.message}</ErrorMessage>
        </InputGroup>

        <InputGroup>
          <LabelUpload>
            <UploadSimpleIcon />
            {fileName || 'Carregar imagem do produto'}
            <input
              type="file"
              accept="image/png, image/jpeg"
              {...register('file')}
              onChange={(value) => {
                setFileName(value.target.files[0]?.name);
                register('file').onChange(value);
              }}
            />
          </LabelUpload>
          <ErrorMessage>{errors.file?.message}</ErrorMessage>
        </InputGroup>

        <InputGroup>
          <label htmlFor="category">Categoria</label>
          {/* Controlado de proposito: as categorias chegam da API depois que o
              select ja montou, e um select nao controlado perderia a categoria
              do produto porque a option ainda nao existia na montagem. */}
          <Controller
            name="category"
            control={control}
            defaultValue={product.category}
            render={({ field }) => (
              <select id="category" {...field}>
                <option value="" disabled>
                  Selecione uma categoria
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            )}
          />
          <ErrorMessage>{errors.category?.message}</ErrorMessage>
        </InputGroup>
        
        <OfferGroup>
          <input id="offers" type="checkbox" {...register('offers')} />
          <Label htmlFor="offers">Produto em oferta</Label>
        </OfferGroup>

        <SubmitButton type="submit">Editar produto</SubmitButton>
      </Form>
    </Container>
  );
}
