import { Component } from 'react'
import { connect } from 'react-redux'
import { Panel } from 'react-bootstrap'
import {withRouter} from 'react-router-dom'


class OrderHistoryCard extends Component {
    constructor(props){
        super(props)
    }
    render () {
        const { order, eventKey } = this.props
        let orderItemCount = 0
        let totalPrice = 0
        let purchasedItem
        order.order_detail.forEach((item) => {
            orderItemCount++
            totalPrice += item.price
            if(purchasedItem){
                purchasedItem += ', ' + item.name
            } else {
                purchasedItem = item.name
            }
        })
        let [orderDate, orderTime] = order.update_at.split(' ')
        return (
            <Panel eventKey={eventKey}>
                <Panel.Heading>
                    <Panel.Title toggle>
                        <div className='rowContainer'>
                            <div>
                                <h4>Order#: {order.id}</h4>
                            </div>
                            <div>
                                <h4>Purchased Item: {orderItemCount}</h4>
                            </div>
                            <div>
                                <h4>Date: {orderDate}</h4>
                            </div>
                        </div>
                    </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                    <div className='rowContainer'>
                        <div>
                            <h5>Purchase Items: {purchasedItem}</h5>
                        </div>
                        <div>
                            <h4>Total Price: {totalPrice}</h4>
                        </div>
                    </div>
                </Panel.Body>
            </Panel>
        )
    }
}


export default withRouter(OrderHistoryCard)