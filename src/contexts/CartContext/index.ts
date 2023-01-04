import { createContext } from "react"

export type CartCoffee = {
  id: number
  imageUrl: string
  title: string
  price: number
  quantity: number
}

type CartContextType = {
  coffees: CartCoffee[]
  addCoffeeInCart: (cartCoffee: CartCoffee) => Promise<void>
  removeCoffeeInCartById: (coffeeId: number) => Promise<void>
  handleAddCoffeeQuantity: (cartCoffee: CartCoffee) => void
  handleSubtractCoffeeQuantity: (cartCoffee: CartCoffee) => void
  clearCart: () => Promise<void>
}

export const CartContext = createContext({} as CartContextType)
