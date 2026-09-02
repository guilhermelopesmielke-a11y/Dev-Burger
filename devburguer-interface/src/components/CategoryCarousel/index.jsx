import { useEffect, useState } from "react";
import { api } from "../../services/api";
import CarouselPkg from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CategoryButton, Container, ContainerItems, Feedback, Title } from "./styles";

// O pacote é CommonJS e seu entry faz `module.exports = require('./lib')`.
// O Vite não consegue enxergar o `__esModule` estaticamente, então o import
// default cai como o objeto do módulo em vez do componente. Sem esse unwrap,
// o React quebra com "Element type is invalid ... but got: object".
const Carousel = CarouselPkg.default ?? CarouselPkg;

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 4,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1280 },
        items: 4,
    },
    tablet: {
        breakpoint: { max: 1280, min: 690 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 690, min: 0 },
        items: 1,
    }
};

// A lib sempre renderiza as setas: o `shouldShowArrows` dela só olha as props
// `arrows` / `removeArrowOnDeviceType`, nunca se os itens já cabem na tela.
// Por isso desligamos as setas nativas e controlamos a exibição aqui.
function CarouselArrows({ totalItems, previous, next, carouselState }) {
    // `slidesToShow` vem da lib porque é ela quem resolve o breakpoint atual.
    // Já o total real vem por prop: no modo infinite a lib sobrescreve o
    // `carouselState.totalItems` com a quantidade de clones.
    const slidesToShow = carouselState?.slidesToShow ?? 0;

    if (!slidesToShow || totalItems <= slidesToShow) {
        return null;
    }

    return (
        <>
            <button
                type="button"
                aria-label="Categoria anterior"
                className="react-multiple-carousel__arrow react-multiple-carousel__arrow--left"
                onClick={previous}
            />
            <button
                type="button"
                aria-label="Próxima categoria"
                className="react-multiple-carousel__arrow react-multiple-carousel__arrow--right"
                onClick={next}
            />
        </>
    );
}

export function CategoryCarousel() {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadCategories() {
            try {
                const { data } = await api.get("/categories");
                setCategories(data);
            } catch (err) {
                if (!err.response) {
                    setError("Não foi possível falar com o servidor. A API está rodando?");
                } else if (err.response.status === 401) {
                    setError("Sua sessão expirou. Faça login novamente.");
                } else {
                    setError("Não foi possível carregar as categorias.");
                }
            } finally {
                setLoading(false);
            }
        }
        loadCategories();
    }, []);
console.log(categories)
    return (
        <Container>
            <Title>Categorias</Title>

            {loading && <Feedback>Carregando categorias...</Feedback>}

            {!loading && error && <Feedback $error>{error}</Feedback>}

            {!loading && !error && categories.length === 0 && (
                <Feedback>Nenhuma categoria cadastrada ainda.</Feedback>
            )}

            {!loading && !error && categories.length > 0 && (
                <Carousel
                    responsive={responsive}
                    infinite={true}
                    partialVisible={false}
                    itemClass="carousel-item"
                    arrows={false}
                    customButtonGroup={<CarouselArrows totalItems={categories.length} />}
                >
                    {categories.map((category) => (
                        <ContainerItems key={category.id} $imageUrl={category.url}>
                            <CategoryButton to={`/cardapio?categoria=${category.id}`}>
                                {category.name}
                            </CategoryButton>
                        </ContainerItems>
                    ))}
                </Carousel>
            )}
        </Container>
    )
}
