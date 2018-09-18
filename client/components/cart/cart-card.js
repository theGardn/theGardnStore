import React, { Component } from 'react'
import {
  Panel,
  Image,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  InputGroup
} from 'react-bootstrap'
import { connect } from 'react-redux'
import { updateItemInCartThunk, removeItemFromCartThunk } from '../../store/user'

class CartCard extends Component {
  constructor() {
    super()
    this.state = {
      value: 0
    }
    this.handleQtyChange = this.handleQtyChange.bind(this)
    this.handleQtyUpdate = this.handleQtyUpdate.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.getValidationState = this.getValidationState.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
  }

  getValidationState() {
    const num = this.state.value;
    if (num < 1) return 'error'
    return null;
  }

  componentDidMount() {
    const { quantity } = this.props.item
    this.setState({
      value: quantity
    })
  }

  handleQtyChange(evt) {
    const newQty = evt.target.value
    this.setState({
      value: newQty
    })
  }

  async handleDelete() {
    const { item, user } = this.props
    await this.props.removeItem(item, user)
  }

  async handleQtyUpdate() {
    const { item, user } = this.props
    const qty = this.state.value
    await this.props.updateQty(item, qty, user)
  }

  render() {
    const { id, name, price, imageUrl } = this.props.item
    return (
      <Panel key={id} id="cart-card" >
        <Panel.Body>
          <div id="cart-img">
            <Image src={imageUrl} rounded />
          </div>
          <div id="card-info">
            <div id="card-name-price">
              <div id="card-name">{name}</div>
              <div id="card-price">
                Price: ${price}
                <div>Qty: {this.state.value}</div>
              </div>
            </div>
            <div id="card-qty-delete">
              <FormGroup
                controlId="formValidationWarning"
                validationState={this.getValidationState()}>
                <ControlLabel>Update Qty</ControlLabel>
                <InputGroup>
                  <FormControl
                    type="number"
                    placeholder="#"
                    value={this.state.value}
                    onChange={this.handleQtyChange}
                  />
                  <InputGroup.Button>
                    {
                      (this.state.value < 1) ? <Button disabled>Update</Button> : <Button id="card-update" onClick={this.handleQtyUpdate}>
                        Update
                    </Button>
                    }

                  </InputGroup.Button>
                </InputGroup>
              </FormGroup>
              <Button bsStyle="danger" onClick={this.handleDelete} >Delete</Button>
            </div>
          </div>
        </Panel.Body>
      </Panel>
    )
  }
}

const mapState = state => {
  return {
    user: state.user.user,
    cart: state.user.cart
  }
}

const mapDispatch = dispatch => {
  return {
    updateQty: (item, quantity, user) =>
      dispatch(updateItemInCartThunk(item, quantity, user)),
    removeItem: (item, user) => dispatch(removeItemFromCartThunk(item, user))
  }
}

export default connect(mapState, mapDispatch)(CartCard)
