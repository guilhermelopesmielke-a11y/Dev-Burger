import { CategoryCarousel } from "../../components/CategoryCarousel";
import { OffersCarousel } from "../../components/OffersCarousel";
import { Container, Banner } from "./styles";

export function Home() {
    return (
        <main>
            <Banner>
                <h1>Bem-vindo!</h1>
            </Banner>
            <Container>
                <div>
                    <CategoryCarousel />
                    <OffersCarousel />
                </div>
            </Container>
        </main>
    )
}