import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Panel, Button } from 'react-bootstrap'
import {withRouter} from 'react-router-dom'

import { getOrderHistoryThunk } from '../store/user'
import OrderHistoryCard from './orderHistoryCard'

class PurchaseInfo extends Component {
    constructor(props){
        super(props)
    }
    
    // componentDidMount(){
    //     this.props.getOrderHistory(this.props.user.id, null)
    //     // console.log(this.props.isLoggedIn)
    // }
    
    // handleChange(evt){
    //     this.setState({searchVal: evt.target.value})
    // }

    // handleOrderSearch(evt){
    //     evt.preventDefault()
    //     let { searchVal } = this.state
    //     // console.log('Searching for specific order #: ', searchVal)
    //     if(searchVal) {
    //         this.props.getOrderHistory(this.props.user.id, searchVal)
    //     }
    //     this.setState({searchVal: ''})
    // }
    render(){
        const { orderId } = this.props
        // if(this.props.isLoggedIn && userOrderHistory.length === 0 && !this.state.getHistory){
        //     this.props.getOrderHistory(this.props.user.id, null)
        //     // console.log("****************************")
        //     this.setState({getHistory: true})
        // }
        // console.log("+++++++++++++++++++++")
        // console.log(this.props.userOrderHistory)
        // console.log("+++++++++++++++++++++")

        return (
            <div id='orderHistoryContainer'>
                {/* <div id='searchBar'>
                    <form onSubmit={this.handleOrderSearch}>
                        <input placeholder='Enter Your Order Number' onChange={this.handleChange} id='orderHistorySearchbar' value={this.state.searchVal} />
                        <div><Button bsStyle="primary" onClick={this.handleOrderSearch}>Search</Button></div>
                    </form>
                </div> */}
                <Panel bsStyle="primary" >
                    <Panel.Heading>
                    <Panel.Title componentClass="h3">Order Info</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        {
                            orderId 
                            ? 
                            <div className='purchaseInfo'>
                                <h1>Purchase Success!!</h1>
                                <h1>Your Order # is {orderId}</h1>
                            </div> 
                            : 
                            <h1 className='purchaseInfo'>Purchase Fail!</h1>
                        }
                        
                    </Panel.Body>
                </Panel>
            </div>
            
        )
    }
}

const mapState = (state) => {
    // let productDic = {}
    // state.products.allItems.forEach((item)=>{
    //     productDic[item.id] = { 'name': item.name, 'imageUrl': item.imageUrl}
    // })
    return {
        // userOrderHistory: state.user.orderHistory,
        // isLoggedIn: !!state.user.user.id,
        // user: state.user.user,
        // productDic,
        orderId: state.user.orderId
    }
} 

const mapDispatch = (dispatch) => {
    return {
        // getOrderHistory: (userId, orderId) => dispatch(getOrderHistoryThunk(userId, orderId))
    }
}

// export default PurchaseInfo
export default withRouter(connect(mapState, mapDispatch)(PurchaseInfo))