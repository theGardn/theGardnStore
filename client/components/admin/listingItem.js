import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Panel, Button, Tabs, Tab, Image } from 'react-bootstrap'
import {withRouter, Link} from 'react-router-dom'

import { setItem } from '../../store/products'

class ListingItem extends Component {
    constructor(props){
        super(props)
        this.handleItemSelect = this.handleItemSelect.bind(this)
    }

    handleItemSelect(evt){
        console.log('Setting the current product is: ', this.props.currentItem)
        // console.log(this.props.product)
        this.props.setCurrentItem(this.props.product.id)
        // window.location='/admin/inventory/update'
        this.props.history.push('/admin/inventory/update')
    }
    render(){


        const { product, currentItem } = this.props
        // console.log('Current product is: ', currentItem)
        if(!product){
            return <div></div>
        }
        return (
            <tr onClick={this.handleItemSelect} >
                <th><Image src={product.imageUrl || 'Unknow.png'} rounded className='smallPic' /></th>
                <th>{product.name || 'Unknow'}</th>
                <th>Quantity: {product.quantity}</th>
                <th>Price: {product.price}</th>
            </tr>
        )
    }
}


const mapProps = state => {
    return {
      currentItem: state.products.currentItem,
    //   products: state.products.allItems,
    //   user: state.user.user
    }
  }
  
const mapDispatch = dispatch => {
return {
    setCurrentItem: (itemId) => dispatch(setItem(itemId))
 }
}

// export default withRouter(ListingItem)
export default withRouter(connect(mapProps, mapDispatch)(ListingItem))


