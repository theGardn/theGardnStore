import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Panel, Button } from 'react-bootstrap'

import { getOrderHistoryThunk } from '../store/user'
import OrderHistoryCard from './orderHistoryCard'

class OrderHistory extends Component {
    constructor(props){
        super(props)
        this.state = {
            getHistory: false,
            searchVal: ''
        }
        this.handleOrderSearch = this.handleOrderSearch.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    
    componentDidMount(){
        this.props.getOrderHistory(this.props.user.id, null)
        // console.log(this.props.isLoggedIn)
    }
    
    handleChange(evt){
        this.setState({searchVal: evt.target.value})
    }

    handleOrderSearch(evt){
        evt.preventDefault()
        let { searchVal } = this.state
        // console.log('Searching for specific order #: ', searchVal)
        if(searchVal) {
            this.props.getOrderHistory(this.props.user.id, searchVal)
        }
        this.setState({searchVal: ''})
    }
    render(){
        const { userOrderHistory } = this.props
        if(this.props.isLoggedIn && userOrderHistory.length === 0 && !this.state.getHistory){
            this.props.getOrderHistory(this.props.user.id, null)
            // console.log("****************************")
            this.setState({getHistory: true})
        }
        // console.log("+++++++++++++++++++++")
        // console.log(this.props.userOrderHistory)
        // console.log("+++++++++++++++++++++")

        return (
            <div>
                <div id='searchBar'>
                    <form onSubmit={this.handleOrderSearch}>
                        <input placeholder='Enter Your Order Number' onChange={this.handleChange} id='orderHistorySearchbar' value={this.state.searchVal} />
                        <div><Button bsStyle="primary" onClick={this.handleOrderSearch}>Search</Button></div>
                    </form>
                </div>
                <Panel bsStyle="primary" >
                    <Panel.Heading>
                    <Panel.Title componentClass="h3">Order History</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        {
                        userOrderHistory.length === 0 
                        ? 
                        <h3>No Order Found</h3> 
                        : 
                        userOrderHistory.map((order) => {
                            return (
                                <OrderHistoryCard order={order} key={order.id} productDic={this.props.productDic} />
                            )
                        })
                        }
                    </Panel.Body>
                </Panel>
            </div>
            
        )
    }
}

const mapState = (state) => {
    let productDic = {}
    state.products.allItems.forEach((item)=>{
        productDic[item.id] = { 'name': item.name, 'imageUrl': item.imageUrl}
    })
    return {
        userOrderHistory: state.user.orderHistory,
        isLoggedIn: !!state.user.user.id,
        user: state.user.user,
        productDic
    }
} 

const mapDispatch = (dispatch) => {
    return {
        getOrderHistory: (userId, orderId) => dispatch(getOrderHistoryThunk(userId, orderId))
    }
}


export default connect(mapState, mapDispatch)(OrderHistory)