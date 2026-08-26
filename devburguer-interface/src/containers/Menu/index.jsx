import { Container, Banner, CategoryMenu, ProductsContainer, CategoryButton, BackButton } from "./styles";
import { useEffect, useState } from "react";
import {api} from "../../services/api.js";
import { formatedPrice } from "../../utils/formatPrice.js";
import { CardProduct } from "../../components/CardProduct";
import { useLocation, useNavigate } from "react-router-dom";


export function Menu(){

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([])
    
    const navigate = useNavigate();
    
    const {search} = useLocation()
    const queryParams = new URLSearchParams(search)
    const [activeCategory, setActiveCategory] = useState((()=>{
        const categoryId = +queryParams.get('categoria')

        if (categoryId){
            return categoryId
        }
        return 0
    }));

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
                <BackButton
                    onClick = {() => {
                        navigate(
                            {
                                pathname:'/home'
                            }
                        )
                    }}
                >Voltar</BackButton>
                {categories.map((category) => (
                    <CategoryButton 
                    key={category.id} 
                    $isActiveCategory={category.id === activeCategory}
                    onClick = {() => {
                        navigate(
                            {
                                pathname: '/cardapio',
                                search: `?categoria=${category.id}`
                            },
                            {
                                replace:true,
                            }
                        )
                        setActiveCategory(category.id)
                    }}>
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