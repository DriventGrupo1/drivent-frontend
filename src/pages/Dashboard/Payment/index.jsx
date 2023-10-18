import useEnrollment from "../../../hooks/api/useEnrollment";
import UsuarioSemInscricao from "../../../components/Payment/UsarioSemIncricao";

export default function Payment() {

  const { enrollment } = useEnrollment()
  
  if(!enrollment) {
    return(
    <UsuarioSemInscricao></UsuarioSemInscricao>
    )
  }

  return 'Pagamento: Em breve!';
}