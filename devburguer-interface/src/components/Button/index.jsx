import { ContainerButton } from "./styles";


export function Button({ children, ...rest }) {
    return(
        <ContainerButton {...rest}>{children}</ContainerButton>
    )
}