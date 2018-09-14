import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Grid, Row, Col } from 'react-bootstrap'
// import { addItemToCartThunk } from '../store'
import SingleProductCard from './singleProductCard'

class ProductDetail extends React.Component {
    render() {
        console.log('Product details')
        
        if(!this.props.currentItem) return <Redirect to='/home' />
        return (
            <div>
                <div>
                    productDetail
                </div>
                <SingleProductCard />
                <div>
                    Display product list here
                </div>
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