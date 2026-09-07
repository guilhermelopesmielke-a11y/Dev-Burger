import { useEffect } from "react"
import { api } from '../../../services/api'

export function Products() {

    useEffect(() => {
        async function loadOffers() {
            try {
                const { data } = await api.get("/products");
                const offersData = data.filter((offer) => offer.offers);
                setOffers(offersData);
            } catch (err) {
                if (!err.response) {
                    setError("Não foi possível falar com o servidor. A API está rodando?");
                } else if (err.response.status === 401) {
                    setError("Sua sessão expirou. Faça login novamente.");
                } else {
                    setError("Não foi possível carregar as ofertas.");
                }
            } finally {
                setLoading(false);
            }
        }
        loadOffers();
    }, [])


    return (
        <div>
            <h1>Products</h1>
        </div>
    )
}