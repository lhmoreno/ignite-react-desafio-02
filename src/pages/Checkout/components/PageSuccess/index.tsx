import { 
  DeliveryContainer, 
  InfoIcon, 
  Infos, 
  PageSuccessContainer, 
} from "./styles"
import motoDeliverySvg from "../../../../assets/moto-delivery.svg"
import { CurrencyDollar, MapPin, Timer } from "phosphor-react"

export function PageSuccess() {
  return (
    <PageSuccessContainer>
      <div>
        <h2>Uhu! Pedido confirmado</h2>
        <span>Agora é só aguardar que logo o café chegará até você</span>
      </div>

      <DeliveryContainer>
        <Infos>
          <div>
            <InfoIcon className="purple">
              <MapPin weight="fill" />
            </InfoIcon>
            <div>
              <p>Entrega em <strong>Rua João Daniel Martineli, 102</strong></p>
              <p>Farrapos - Porto Alegre, RS</p>
            </div>
          </div>

          <div>
            <InfoIcon className="yellow">
              <Timer weight="fill" />
            </InfoIcon>
            <div>
              <p>Previsão de entrega</p>
              <strong>20 min - 30 min</strong>
            </div>
          </div>
          
          <div>
            <InfoIcon className="orange">
              <CurrencyDollar weight="fill" />
            </InfoIcon>
            <div>
              <p>Forma de pagamento</p>
              <strong>Cartão de Crédito</strong>
            </div>
          </div>
        </Infos>

        <img src={motoDeliverySvg} alt="" />
      </DeliveryContainer>
    </PageSuccessContainer>
  )
}
