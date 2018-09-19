import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Panel, ListGroup, ListGroupItem, Table, Image  } from 'react-bootstrap'
import {withRouter} from 'react-router-dom'


class OrderHistoryCard extends Component {
    constructor(props){
        super(props)
        this.listItem = this.listItem.bind(this)
    }

    listItem(item){
        // console.log(this.props.productDic)
        // console.log(item)
        return (
            <tr key={item.id}>
                <th><Image src={this.props.productDic[item.productId].imageUrl || 'Unknow.png'} rounded className='smallPic' /></th>
                <th>{this.props.productDic[item.productId].name || 'Unknow'}</th>
                <th>Quantity: {item.quantity}</th>
                <th>Price: ${item.price}</th>
            </tr>
        )
    }
    render () {
        const { order, eventKey } = this.props
        let orderItemCount = 0
        let totalPrice = 0
        let purchasedItem = ''
        if(Array.isArray(order.order_details)) {
            order.order_details.forEach((item) => {
                orderItemCount++
                totalPrice += item.price * item.quantity
                if(purchasedItem){
                    purchasedItem += ', ' + item.name
                } else {
                    purchasedItem = item.name
                }
            })
        }

        let [orderDate, orderTime] = order.updatedAt.split('T')
        return (
            <Panel  bsStyle="info" key={order.id}>
                <Panel.Heading>
                    <Panel.Title>
                        <Table responsive hover>
                            <thead>
                            <tr>
                            <th>Order#: {order.id}</th>
                            <th>Total Price: ${totalPrice.toFixed(2)} </th>
                            <th>Date: {orderDate}</th>
                            </tr>
                            </thead>
                        </Table>
                    </Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    <div className='rowContainer'>
                        <Table responsive>
                            <thead>
                                {order.order_details.map((product) => {
                                    return this.listItem(product)
                                })}
                            </thead>

                        </Table>
                    </div>
                </Panel.Body>
            </Panel>
        )
    }
}


export default withRouter(OrderHistoryCard)
