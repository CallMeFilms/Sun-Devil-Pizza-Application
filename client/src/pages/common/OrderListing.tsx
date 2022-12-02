import React from 'react'
import {Order} from "../../common/types";

type OrderListingProps = {
    orders: Order[],
    updateOrder: (order: Order) => void,
    actionName: string
}
function OrderListing({orders, updateOrder, actionName}: OrderListingProps) {
    return (
        <table style={{width:"100%"}}>
            <thead>
            <tr>
                <th>Order #</th>
                <th>Customer</th>
                <th>Details</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {orders.map(order => {
                return <tr key={order.orderNum}>
                    <td>{order.orderNum}</td>
                    <td>{`${order.firstName} ${order.lastName}`}</td>
                    <td>{order.items && order.items.map((item)=>JSON.stringify(item))}</td>
                    <td><button onClick={() => updateOrder(order)}>{actionName}</button></td>
                </tr>
            })}
            </tbody>
        </table>
    )
}
export default OrderListing;
