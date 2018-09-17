import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Panel, PanelGroup } from 'react-bootstrap'

import { getOrderHistoryThunk } from '../store/user'
import OrderHistoryCard from './orderHistoryCard'

class OrderHistory extends Component {
    componentDidMount(){
        this.props.getOrderHistory()
    }

    handleOrderSearch(evt){
        evt.preventDefault()
        if(evt.target.value) this.props.getOrderHistory(evt.target.value)
    }
    render(){
        let panelKey = 1
        return (
            <div>
                <div id='orderHistorySearchbar'>
                    <input placeholder='Enter Your Order Number' onSubmit={this.handleOrderSearch}  />
                </div>
                <Panel bsStyle="info" >
                    <Panel.Heading>
                    <Panel.Title componentClass="h3">Order History</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                    <PanelGroup accordion id='orderHistoryList' >
                        {this.props.orderHistory.map((order) => {
                            return (
                                <OrderHistoryCard order={order} eventKey={panelKey++} />
                            )
                        })}
                    </PanelGroup>
                    </Panel.Body>
                </Panel>
            </div>
            
        )
    }
}

const mapState = (state) => {
    return {
        orderHistory: state.user.orderHistory,
        user: state.user.user,

    }
} 

const mapDispatch = (dispatch) => {
    return {
        getOrderHistory: (userId, orderId) => dispatch(getOrderHistoryThunk(userId, orderId))
    }
}


export default connect(mapState, mapDispatch)(OrderHistory)