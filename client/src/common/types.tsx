// export type User = {
//     asuID: string,
//     name?: string,
//     role: "chef" | "customer" | "orderProcessor";
// }

export type Order = {
    firstName?: string,
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
    accepted: Order[],
    finished: Order[],
    readyToCook: Order[],
    cooking: Order[],
    addToCard?: Order[],

}

export type User = {
    username?: string,
    password?: string,
    role?: string
}
