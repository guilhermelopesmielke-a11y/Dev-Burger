import { Container, Banner, CategoryMenu, ProductsContainer, CategoryButton, BackButton } from "./styles";
import { useEffect, useState } from "react";
import {api} from "../../services/api.js";
import { formatedPrice } from "../../utils/formatPrice.js";
import { CardProduct } from "../../components/CardProduct";
import { useSearchParams } from "react-router-dom";


export function Menu(){

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([])
    
    // Derivado da URL, e nao guardado em estado local: assim o filtro acompanha
    // o link clicado, o botao voltar/avancar do navegador e um F5 na pagina.
    // 'Todas' e a categoria 0, que e o fallback quando nao ha parametro.
    const [searchParams] = useSearchParams()
    const activeCategory = Number(searchParams.get('categoria')) || 0

    useEffect(() => {
        async function loadProducts() {
            try {
                const { data } = await api.get("/products");
                setProducts(data);
            } catch (error) {
                console.error(`Erro ao carregar produtos: ${error}`);
            }
        }

        async function loadCategories() {
            try {
                const { data } = await api.get("/categories");
                const allCategories = [{id: 0, name: "Todas"}, ...data];
                setCategories(allCategories);
            } catch (error) {
                console.error(`Erro ao carregar categorias: ${error}`);
            }
        }

        loadCategories();
        loadProducts();
    }, []);

    useEffect(() => {
        if(activeCategory === 0){
            setFilteredProducts(products)
        } else{
            const filterProducts = products.filter(product =>
                product.category_id === activeCategory
            ) 

            setFilteredProducts(filterProducts)
        }
    }, [products, activeCategory])
    

    return(
        <Container>
            <Banner>
                <h1>O MELHOR
                    <br/>
                    HAMBURGUER
                    <br/>
                    ESTA AQUI!
                    <span>Esse cardápio está irreversível!</span>
                </h1>
            </Banner>
            <CategoryMenu>
                <BackButton to="/home">Voltar</BackButton>
                {categories.map((category) => (
                    <CategoryButton
                    key={category.id}
                    to={`/cardapio?categoria=${category.id}`}
                    replace
                    $isActiveCategory={category.id === activeCategory}>
                        {category.name}
                    </CategoryButton>
                ))}
            </CategoryMenu>

            <ProductsContainer>
                {filteredProducts.map((product) => 
                    <CardProduct key={product.id} product={product} />
                )}    
            </ProductsContainer>

        </Container>
    )
}