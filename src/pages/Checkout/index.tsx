import { priceFormatter } from "../../utils/formatter"
import { UserDeliveryForm } from "./components/UserDeliveryForm"
import { PageSuccess } from "./components/PageSuccess"
import { 
  CheckoutContainer, 
  ConfirmationContainer, 
  Values,
} from "./styles"
import * as z from "zod"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCart } from "../../hooks/useCart"
import { CheckoutCoffee } from "./components/CheckoutCoffee"

const userDeliveryFormSchema = z.object({
  cep: z.string(),
  street: z.string(),
  number: z.number(),
  complement: z.string().nullable(),
  district: z.string(),
  city: z.string(),
  uf: z.string(),
  payment: z.enum(['credit-card', 'debit-card', 'money']),
})

type UserDeliveryFormInputs = z.infer<typeof userDeliveryFormSchema>

export function Checkout() {
  const { 
    coffees, 
    removeCoffeeInCartById,
    handleAddCoffeeQuantity,
    handleSubtractCoffeeQuantity 
  } = useCart()
  const userDeliveryForm = useForm<UserDeliveryFormInputs>({
    resolver: zodResolver(userDeliveryFormSchema),
    defaultValues: {
      payment: 'credit-card'
    }
  })

  const { handleSubmit, getValues } = userDeliveryForm
  
  const price = coffees.reduce((acc, coffee) => {
    acc.coffees += coffee.price * coffee.quantity
    acc.total += coffee.price * coffee.quantity

    return acc
  }, {
    coffees: 0,
    total: 3.7
  })

  function handleSubmitUserDeliveryForm(data: any) {
    console.log(getValues())
  }

  return (
    <CheckoutContainer>
      <div>
        <h3>Complete seu pedido</h3>

        <form onSubmit={handleSubmit(handleSubmitUserDeliveryForm)}>
          <FormProvider {...userDeliveryForm}>
            <UserDeliveryForm />
          </FormProvider>
        </form>
      </div>
      <div>
        <h3>Cafés selecionados</h3>

        <ConfirmationContainer>
          {coffees.map((coffee) => (
            <CheckoutCoffee 
              key={coffee.id} 
              coffee={coffee}
              onAddQuantity={() => handleAddCoffeeQuantity(coffee)} 
              onSubtractQuantity={() => handleSubtractCoffeeQuantity(coffee)}
              onRemoveCoffee={() => removeCoffeeInCartById(coffee.id)}
            />
          ))}
          <Values>
            <div>
              <p>Total de itens</p>
              <p>{priceFormatter.format(price.coffees)}</p>
            </div>
            <div>
              <p>Entrega</p>
              <p>R$ 3,70</p>
            </div>
            <div className="total">
              <p>Total</p>
              <p>{priceFormatter.format(price.total)}</p>
            </div>
          </Values>
          <button
            onClick={handleSubmitUserDeliveryForm}
          >
            Confirmar pedido
          </button>
        </ConfirmationContainer>
      </div>
    </CheckoutContainer>
  )
}
