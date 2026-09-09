import { useEffect, useState } from 'react';
import { Controller, useForm } from "react-hook-form"
import { toast } from 'react-toastify';

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
  LabelUpload,
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
    file: yup.mixed().test('required', 'Escolha um arquivo para continuar', value =>{
      return value && value.length > 0
    }).test('fileSize', 'Carregue arquivos até 5MB', value => {
      return value && value[0]?.size <= 5 * 1024 * 1024
    }).test('fileType', 'Carregue arquivos PNG ou JPEG', value => {
      return value && ['image/jpeg', 'image/png'].includes(value[0]?.type)
    })
  })

export function NewProduct() {
  const [fileName, setFileName] = useState(null)
  const [categories, setCategories] = useState([])
  
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
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const onSubmit = async (data) => {
    const productFormData = new FormData()
    productFormData.append('name', data.name)
    productFormData.append('price', data.price)
    productFormData.append('category_id', data.category)
    productFormData.append('file', data.file[0])

    try {
      await toast.promise(api.post('/products', productFormData), {
        pending: 'Adicionando o produto...',
        success: 'Produto adicionado com sucesso',
        error: 'Falha ao adicionar o produto',
      })

      // So limpa depois que a API confirmou: se der erro o admin continua com
      // tudo preenchido e so precisa tentar de novo. O reset zera os campos do
      // formulario; o nome do arquivo mora num estado a parte e volta na mao.
      reset()
      setFileName(null)
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
          <select id="category" defaultValue="" {...register('category')}>
            <option value="" disabled>
              Selecione uma categoria
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <ErrorMessage>{errors.category?.message}</ErrorMessage>
        </InputGroup>

        <SubmitButton type="submit">Adicionar produto</SubmitButton>
      </Form>
    </Container>
  );
}
