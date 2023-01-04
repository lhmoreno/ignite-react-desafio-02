import axios from "axios"

export const coffeeDeliveryApi = axios.create({
  baseURL: 'http://localhost:4000',
})
