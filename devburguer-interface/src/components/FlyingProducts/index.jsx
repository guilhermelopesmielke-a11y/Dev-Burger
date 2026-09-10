import { createPortal } from 'react-dom';
import { FlightArc, FlightImage, FlightPath } from './styles';

// Os clones vao num portal no body para escapar do `overflow` do carrossel e do
// empilhamento de contexto dos cards: dentro da arvore original o produto seria
// cortado assim que saisse da borda do proprio card.
export function FlyingProducts({ flights, duration, onFlightEnd }) {
    if (flights.length === 0) {
        return null;
    }

    // As tres camadas terminam juntas, mas so a de fora dispara o evento no
    // proprio no; o filtro pelo currentTarget descarta os das camadas de dentro,
    // que sobem por bubbling.
    function handleAnimationEnd(event, flightId) {
        if (event.target === event.currentTarget) {
            onFlightEnd(flightId);
        }
    }

    return createPortal(
        flights.map((flight) => (
            <FlightPath
                key={flight.id}
                aria-hidden="true"
                onAnimationEnd={(event) => handleAnimationEnd(event, flight.id)}
                style={{
                    '--flight-start-x': `${flight.startX}px`,
                    '--flight-start-y': `${flight.startY}px`,
                    '--flight-size': `${flight.size}px`,
                    '--flight-delta-x': `${flight.deltaX}px`,
                    '--flight-delta-y': `${flight.deltaY}px`,
                    '--flight-duration': `${duration}ms`,
                }}
            >
                <FlightArc>
                    <FlightImage src={flight.imageUrl} alt="" />
                </FlightArc>
            </FlightPath>
        )),
        document.body,
    );
}
