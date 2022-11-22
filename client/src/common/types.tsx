// export type User = {
//     asuID: string,
//     name?: string,
//     role: "chef" | "customer" | "orderProcessor";
// }

export type Order = {
    // id: number,
    // status: "accepted" | "finished" | "cancelled" | "cooking" | "cooked",
    // type: "Pepperoni" | "Cheese" | "Veggie",
    // customer: User,
    // toppings: string[],
    // pickupTime: string
    firsName?: string,
    lastName?: string,
    cardNumber?: number,
    cardExpiration?: string,
    cardCVV?: number,
    asuID?: string,
    items?: any[],
    pickupTime?: string,
    status?: number,
    orderNum?: number
}
export type GlobalState = {
    user?: User,
    readyToCook: Order[],
    cooking: Order[],
    accepted: Order[],
    finished: Order[],
    addToCard?: Order[],

}

export type User = {
    username?: string,
    password?: string,
    role?: string
}
