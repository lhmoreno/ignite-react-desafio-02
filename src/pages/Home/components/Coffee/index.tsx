import { ShoppingCart } from "phosphor-react"
import { useState } from "react"
import { InputNumber } from "../../../../components/InputNumber"
import { priceOnlyFormatter } from "../../../../utils/formatter"
import { 
  CartButton,
  CoffeeContainer, Tags,  
} from "./styles"

export type CoffeeData = {
  id: string
  imageUrl: string
  title: string
  description: string
  price: number
  tags: string[]
}

type CoffeeProps = {
  coffee: CoffeeData
  onAddCoffeeToCart: (coffeeId: string) => void
}

export function Coffee({ coffee, onAddCoffeeToCart }: CoffeeProps) {
  const [amount, setAmount] = useState(1)

  function handleAddToCart() {
    onAddCoffeeToCart(coffee.id)
  }

  return (
    <CoffeeContainer>
      <img src={coffee.imageUrl} alt="" />
      <Tags>
        {coffee.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </Tags>

      <h3>{coffee.title}</h3>
      <p>{coffee.description}</p>

      <footer>
        <span>R$ <strong>{priceOnlyFormatter.format(coffee.price)}</strong></span>
        <div>
          <InputNumber 
            value={amount}
            onSubtract={() => setAmount(value => {
              if (value > 1) {
                return value - 1
              } else {
                return value
              }
            })}
            onAdd={() => setAmount(value => value + 1)}
          />
          <CartButton>
            <ShoppingCart weight="fill" />
          </CartButton>
        </div>
      </footer>
    </CoffeeContainer>
  )
}
