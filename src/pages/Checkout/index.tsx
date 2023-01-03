import { Trash } from "phosphor-react"
import { Fragment, useEffect, useState } from "react"
import { InputNumber } from "../../components/InputNumber"
import { priceFormatter } from "../../utils/formatter"
import { UserDeliveryForm } from "./components/UserDeliveryForm"
import { PageSuccess } from "./components/PageSuccess"
import { 
  CheckoutContainer, 
  Coffee, 
  ConfirmationContainer, 
  Values,
} from "./styles"
import * as z from "zod"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

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

type CoffeeCheckout = {
  id: string
  imageUrl: string
  title: string
  price: number
  amount: number
}

const coffees: CoffeeCheckout[] = [
  {
    id: '1',
    imageUrl: 'http://localhost:5173/coffees/expresso-tradicional.png',
    title: 'Expresso Tradicional',
    price: 9.9,
    amount: 2
  },
  {
    id: '2',
    imageUrl: 'http://localhost:5173/coffees/expresso-americano.png',
    title: 'Expresso Americano',
    price: 9.9,
    amount: 5
  }
]

export function Checkout() {
  const [coffeesCheckout, setCoffeesCheckout] = useState<CoffeeCheckout[]>(coffees)
  const userDeliveryForm = useForm<UserDeliveryFormInputs>({
    resolver: zodResolver(userDeliveryFormSchema),
    defaultValues: {
      payment: 'credit-card'
    }
  })

  const { handleSubmit, getValues } = userDeliveryForm
  
  const price = coffeesCheckout.reduce((acc, coffee) => {
    acc.coffees += coffee.price * coffee.amount
    acc.total += coffee.price * coffee.amount

    return acc
  }, {
    coffees: 0,
    total: 3.7
  })

  function handleAddAmountCoffeeCheckout(coffeeIndex: number) {
    setCoffeesCheckout((values) => {
      const newValues = [...values]
      newValues[coffeeIndex].amount += 1

      return newValues
    })
  }

  function handleSubtractAmountCoffeeCheckout(coffeeIndex: number) {
    setCoffeesCheckout((values) => {
      const newValues = [...values]
      const amount = newValues[coffeeIndex].amount
      if (amount > 1) {
        newValues[coffeeIndex].amount -= 1
        return newValues
      } else {
        return values
      }
    })
  }

  function handleRemoveCoffeeCheckout(coffeeIndex: number) {
    setCoffeesCheckout((values) => {
      const newValues = [...values].filter((coffee, index) => index !== coffeeIndex)

      return newValues
    })
  }

  function handleSubmitUserDeliveryForm(data: any) {
    // console.log(data)
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
          {coffeesCheckout.map((coffee, index) => (
            <Fragment key={coffee.id}>
              <Coffee>
                <img src={coffee.imageUrl} alt="" />
                <div>
                  <p>{coffee.title}</p>
                  <div>
                    <InputNumber 
                      value={coffee.amount}
                      onSubtract={() => handleSubtractAmountCoffeeCheckout(index)}
                      onAdd={() => handleAddAmountCoffeeCheckout(index)}
                    />
                    <button onClick={() => handleRemoveCoffeeCheckout(index)}>
                      <Trash />
                      Remover
                    </button>
                  </div>
                </div>
                <p>{priceFormatter.format(coffee.price * coffee.amount)}</p>
              </Coffee>

              <hr />
            </Fragment>
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
