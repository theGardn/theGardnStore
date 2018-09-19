import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Panel, Button, Grid, Row, Col, Image, Table } from 'react-bootstrap'
import {withRouter, Link} from 'react-router-dom'

import { setItem } from '../../store/products'

class UpdateItem extends Component {
    constructor(props){
        super(props)
        this.state = {
            price: this.props.currentItem.price || 0,
            quantity: this.props.currentItem.quantity || 0
        }
        // this.props.setItem(this.props.match.params.id)
        this.handleUpdate = this.handleUpdate.bind(this)
        this.handleGoBack = this.handleGoBack.bind(this)
        this.handleQuantityChange = this.handleQuantityChange.bind(this)
        this.handleClear = this.handleClear.bind(this)
    }


    findCurrentItem(itemId){
        if(this.props.products && !this.props.currentItem){
          // console.log('Products: ', this.props.products)
          // console.log('CurrentItem: ', this.props.currentItem)
        this.props.setItem(itemId)
        }
    }
    handleItemSelect(evt){
        // console.log('Current product is: ', this.props.currentItem)
        // console.log(this.props.product)
        // this.props.setCurrentItem(this.props.product.id)
        // window.location='/admin/inventory/update'
    }

    handleUpdate(evt){
        evt.preventDefault
        const { price, quantity } = this.props.currentItem
        if(!(this.state.price > 0) || !(this.state.price > 0)) return false
        if (price != this.state.price || quantity != this.state.quantity){
            // update item
        }
    }

    handleClear(evt){
        const { price, quantity } = this.props.currentItem
        this.setState({
            price: price,
            quantity: quantity
        })
    }
    handleQuantityChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }
    
    handleGoBack(evt){
        this.props.history.goBack()
    }
    
    render(){
        const { currentItem, products } = this.props
        console.log('Current product is: ', currentItem)
        console.log('All products')
        console.log(products)

        if(products && !currentItem){
            // this.props.setItem(this.props.match.params.id)
            return <div>A empty item</div>
        }
        return (
        <div>
        <Panel bsStyle="info" id="singleProduct">
          <Panel.Heading>
            <Panel.Title componentClass="h3">{currentItem.name}</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <Grid>
              <Row className="singleProduct">
                <Col md={5}>
                  <Image src={currentItem.imageUrl} className='singleProductPic' thumbnail />
                  <div>
                        <Button bsStyle="primary" onClick={this.handleGoBack}>
                          Back To List
                        </Button>
                      </div>
                </Col>

                <Col md={6} id='tinyBox'>
                  <form onSubmit={this.handleUpdate} id='adminUpdateForm'>
                    <h2>Product: {currentItem.name}</h2>
                    <div className='rowContainer'>
                        <div>
                        <h3>Price: {currentItem.price} =></h3>
                        </div>
                        <div>
                        <input value={this.state.price} name='price' onChange={this.handleQuantityChange} />
                        </div>
                    </div>
                    <div className='rowContainer'>
                        <div>
                        <h3>In store: {currentItem.quantity} =></h3>
                        </div>
                        <div>
                        <input value={this.state.quantity} name='quantity' onChange={this.handleQuantityChange} />
                        </div>
                    </div>
                    <div>
                    <div>
                    <Button bsStyle="primary" onClick={this.handleUpdate}>
                    Submit
                    </Button>
                    </div>                 
                    <div>
                        <Button bsStyle="primary" onClick={this.handleClear}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </form>
                </Col>
              </Row>
            </Grid>
          </Panel.Body>
        </Panel>
        <div />
      </div>
        )
    }
}


const mapProps = state => {
    return {
      currentItem: state.products.currentItem,
      products: state.products.allItems,
    //   user: state.user.user
    }
  }
  
const mapDispatch = dispatch => {
return {
    setItem: (itemId) => dispatch(setItem(itemId))
 }
}

// export default withRouter(ListingItem)
export default withRouter(connect(mapProps, mapDispatch)(UpdateItem))


