import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
// import { addItemToCartThunk } from '../store'
import SingleProductCard from './singleProductCard'

class ProductDetail extends React.Component {
    render() {
        console.log('Product details')
        
        // if(!this.props.currentItem) return <Redirect to='/root' />
        return (
            <div>
                <div>
                    productDetail
                </div>
                {/* <SingleProductCard /> */}
            </div>
        )
    }
}

const mapProps = (state) => {
    return {
        currentItem: state.products.currentItem,
        user: state.user.user
    }
}

const mapDispatch = (dispatch) => {
    return {
        // addItemToCart: (item, quantity, user) => dispatch(addItemToCartThunk(item, quantity, user))
    }
}



export default connect(mapProps, mapDispatch)(ProductDetail)