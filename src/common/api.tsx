import {Order, APIInterface} from "./types";

export class LocalApi implements APIInterface
{
    createOrder(order: Order) {
    }
    getOrders() {
        return []
    }
    updateOrder(order: Order) {
    }
}
