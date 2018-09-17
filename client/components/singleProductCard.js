import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {addItemToCartThunk} from '../store'
import {Grid, Row, Col, Button, Panel, Image} from 'react-bootstrap'
import {withRouter} from 'react-router-dom'

class SingleProductCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 1
    }
    this.handleQuantityChange = this.handleQuantityChange.bind(this)
    this.handleAddItem = this.handleAddItem.bind(this)
  }

  handleQuantityChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleAddItem(evt) {
    evt.preventDefault()
    this.props.addItemToCart(this.props.currentItem, this.state.quantity, this.props.user)
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
                  <Image src={currentItem.imageUrl} thumbnail />
                </Col>

                <Col md={6}>
                  <form onSubmit={this.handleAddItem}>
                    <h3>Product: {currentItem.name}</h3>
                    <h3>Price: {currentItem.price}</h3>
                    <h3>In store: {currentItem.quantity}</h3>
                    <div>
                      <label for="addQuantity">Purchase: </label>
                      <input
                        type="text"
                        className="addQuantity"
                        placeholder="Enter quantity you want"
                        onChange={this.handleQuantityChange}
                        value={this.state.quantity}
                      />
                      <Button bsStyle="primary" onClick={this.handleAddItem}>
                        Add to Cart
                      </Button>
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
    user: state.user.user
  }
}

const mapDispatch = dispatch => {
  return {
    addItemToCart: (item, quantity, user) =>
      dispatch(addItemToCartThunk(item, quantity, user))
  }
}

export default withRouter(connect(mapProps, mapDispatch)(SingleProductCard))
