export type User = {
    asuID: string,
    name?: string,
    role: "chef" | "customer" | "orderProcessor";
}

export type Order = {
    id: number,
    status: "accepted" | "finished" | "cancelled" | "cooking" | "cooked",
    type: "Pepperoni" | "Cheese" | "Veggie",
    customer: User,
    toppings: string[],
    pickupTime: string
}
export type GlobalState = {
    user?: User,
    orders: Order[]
}
