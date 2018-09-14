import React, {Component} from 'react'
import {
  Panel,
  Image,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  InputGroup
} from 'react-bootstrap'
import {connect} from 'react-redux'
import {updateItemInCartThunk} from '../../store/user'

class CartCard extends Component {
  constructor() {
    super()
    this.state = {
      value: 1
    }
    this.handleQtyChange = this.handleQtyChange.bind(this)
    this.handleQtyUpdate = this.handleQtyUpdate.bind(this)
  }

  handleQtyChange(evt) {
    this.setState({
      value: evt.target.value
    })
  }

  async handleQtyUpdate() {
    const {item, user} = this.props
    const qty = this.state.value
    await this.props.updateQty(item, qty, user)
  }

  render() {
    const {id, name, price, imageUrl} = this.props.item
    return (
      <Panel id="cart-card">
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
              <FormGroup controlId="formControlsSelect">
                <ControlLabel>Update Qty</ControlLabel>
                <InputGroup>
                  <FormControl
                    componentClass="select"
                    placeholder="select"
                    value={this.state.value}
                    onChange={this.handleQtyChange}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </FormControl>
                  <InputGroup.Button>
                    <Button id="card-update" onClick={this.handleQtyUpdate}>
                      Update
                    </Button>
                  </InputGroup.Button>
                </InputGroup>
              </FormGroup>
              <Button bsStyle="danger">Delete</Button>
            </div>
          </div>
        </Panel.Body>
      </Panel>
    )
  }
}

const mapState = state => {
  return {
    user: state.user.user
  }
}

const mapDispatch = dispatch => {
  return {
    updateQty: (item, quantity, user) =>
      dispatch(updateItemInCartThunk(item, quantity, user))
  }
}

export default connect(mapState, mapDispatch)(CartCard)
