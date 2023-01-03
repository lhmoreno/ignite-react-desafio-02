import { Location, HeaderContainer } from "./styles"
import { MapPin, ShoppingCart } from "phosphor-react"

import logoSvg from "../../assets/logo.svg"
import { NavLink } from "react-router-dom"

export function Header() {
  return (
    <HeaderContainer>
      <NavLink to="/">
        <img src={logoSvg} alt="" />
      </NavLink>

      <div>
        <Location>
          <MapPin weight="fill" />
          Itararé, SP
        </Location>
        <NavLink to="/checkout" title="Checkout">
          <ShoppingCart weight="fill" />
        </NavLink>
      </div>
    </HeaderContainer>
  )
}
