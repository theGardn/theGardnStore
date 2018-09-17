import { Component } from 'react'
import { connect } from 'react-redux'
import { Panel, PanelGroup } from 'react-bootstrap'

import { getOrderHistoryThunk } from '../store/user'
import OrderHistoryCard from './orderHistoryCard'

class OrderHistory extends Component {
    componentDidMount(){
        getOrderHistory()
    }

    handleOrderSearch(evt){
        evt.preventDefault()
        if(evt.target.value) getOrderHistory(evt.target.value)
    }
    render(){
        let panelKey = 1
        return (
            <div>
                <input placeholder='Enter Your Order Number' onSubmit={this.handleOrderSearch} id='orderHistorySearchbar' />
                <PanelGroup accordion id='orderHistoryList' >
                    {this.props.orderHistory.map((order) => {
                        return (
                            <OrderHistoryCard order={order} eventKey={panelKey++} />
                        )
                    })}
                </PanelGroup>
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