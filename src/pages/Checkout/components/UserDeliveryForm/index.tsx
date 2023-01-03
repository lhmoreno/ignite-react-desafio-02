import { 
  FieldsetPayment, 
  FieldsetUserData, 
  PaymentType, 
  PaymentTypeButton 
} from "./styles"
import { 
  Bank, 
  CreditCard, 
  CurrencyDollar, 
  MapPinLine, 
  Money 
} from "phosphor-react"
import { Controller, useFormContext } from "react-hook-form"


export function UserDeliveryForm() {
  const { register, control } = useFormContext()

  return (
    <>
      <FieldsetUserData>
        <legend>
          <MapPinLine />
          <div>
            <p>Endereço de Entrega</p>
            <p>Informe o endereço onde deseja receber seu pedido</p>
          </div>
        </legend>
        <div>
          <input 
            type="text" 
            placeholder="CEP"
            required
            {...register('cep')}
          />
          <input 
            type="text" 
            placeholder="Rua" 
            required
            {...register('street')}
          />
          <input 
            type="number" 
            placeholder="Número" 
            required
            {...register('number', { valueAsNumber: true })}
          />
          <input 
            type="text" 
            placeholder="Complemento" 
            {...register('complement')}
          />
          <input 
            type="text" 
            placeholder="Bairro"
            required 
            {...register('district')}
          />
          <input 
            type="text" 
            placeholder="Cidade"
            required 
            {...register('city')}
          />
          <input 
            type="text" 
            placeholder="UF" 
            required
            {...register('uf')}
          />
        </div>
      </FieldsetUserData>

      <FieldsetPayment>
        <legend>
          <CurrencyDollar />
          <div>
            <p>Pagamento</p>
            <p>O pagamento é feito na entrega. Escolha a forma que deseja pagar</p>
          </div>
        </legend>

        <Controller 
          control={control}
          name="payment"
          render={({ field }) => {
            return (
              <PaymentType
                onValueChange={field.onChange}
                value={field.value}
              >
                <PaymentTypeButton value="credit-card">
                  <CreditCard />
                  Cartão de crédito
                </PaymentTypeButton>
                <PaymentTypeButton value="debit-card">
                  <Bank />
                  Cartão de débito
                </PaymentTypeButton>
                <PaymentTypeButton value="money">
                  <Money />
                  Dinheiro
                </PaymentTypeButton>
              </PaymentType>
            )
          }}
        />
      </FieldsetPayment>
    </>
  )
}
