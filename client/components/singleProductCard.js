import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { addItemToCartThunk, updateItemInCartThunk } from '../store'

import { Grid, Row, Col, Button, Panel, Image, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

import { withRouter } from 'react-router-dom'
import history from '../history'

class SingleProductCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 1
    }
    this.handleQuantityChange = this.handleQuantityChange.bind(this)
    this.handleAddItem = this.handleAddItem.bind(this)
    this.getValidationState = this.getValidationState.bind(this)
  }

  getValidationState() {
    const num = this.state.quantity;
    const { quantity } = this.props.currentItem
    if (num < 1) return 'error'
    if (num > quantity) return 'error'
    return null;
  }

  handleQuantityChange(evt) {
    const newQty = evt.target.value
    this.setState({
      quantity: newQty
    })
  }

  handleGoBack(evt) {
    window.history.back()
  }



  handleAddItem(evt) {
    evt.preventDefault()
    const { cart, currentItem } = this.props
    const existingItem = cart.filter(item => {
      return item.name === currentItem.name
    })
    if (existingItem.length > 0) {
      const newQty = existingItem[0].quantity + Number(this.state.quantity)
      this.props.updateItemInCart(existingItem[0], newQty, this.props.user)
    } else {

      this.props.addItemToCart(this.props.currentItem, Number(this.state.quantity), this.props.user)

    }
  }

  render() {
    if (!this.props.currentItem) return <div />
    let currentItem = this.props.currentItem
    return (
      <div>
        <Panel bsStyle="info" id="singleProduct">
          <Panel.Heading>
            <Panel.Title componentClass="h3">{currentItem.name}</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <Grid>
              <Row className="singleProduct">
                <Col md={6}>
                  <Image src={currentItem.imageUrl} className='singleProductPic' thumbnail />
                </Col>

                <Col md={6}>
                  <form onSubmit={this.handleAddItem}>
                    <h3>Product: {currentItem.name}</h3>
                    <h3>Price: {currentItem.price}</h3>
                    <h3>In store: {currentItem.quantity}</h3>
                    <div>
                      {/* <label htmlFor="addQuantity">Purchase: </label>
                      <input
                        type="text"
                        name="quantity"
                        className="addQuantity"
                        onChange={this.handleQuantityChange}
                        value={this.state.quantity}
                      /> */}
                      <FormGroup
                        controlId="formValidationWarning"
                        validationState={this.getValidationState()}>
                        <ControlLabel>Purchase</ControlLabel>
                        <FormControl
                          type="number"
                          placeholder="#"
                          value={this.state.quanitity}
                          onChange={this.handleQuantityChange}
                        />
                      </FormGroup>
                      <div>

                        {
                          (this.state.quantity < 1 || this.state.quantity > currentItem.quantity) ? <Button disabled>Add to Cart</Button> : <Button bsStyle="primary" onClick={this.handleAddItem}>
                            Add to Cart

                      </Button>
                        }
                      </div>
                      <div>
                        <Button bsStyle="primary" onClick={this.handleGoBack}>
                          Back To List
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
    user: state.user.user,
    cart: state.user.cart
  }
}

const mapDispatch = dispatch => {
  return {
    addItemToCart: (item, quantity, user) =>
      dispatch(addItemToCartThunk(item, quantity, user)),
    updateItemInCart: (item, quantity, user) => dispatch(updateItemInCartThunk(item, quantity, user))
  }
}

export default withRouter(connect(mapProps, mapDispatch)(SingleProductCard))
