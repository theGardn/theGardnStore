import React from 'react'
import { Panel, Image, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'


const CartCard = (props) => {
  const { id, name, price, imageUrl } = props.item
  return (
    <Panel id="cart-card">
      <Panel.Body>
        <div id="cart-img">
          <Image src={imageUrl} rounded />
        </div>
        <div id="card-info">
          <div id="card-name-price">
            <div id="card-name">{name}</div>
            <div id="card-price">${price}</div>
          </div>
          <div id="card-qty-delete">
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Quantity</ControlLabel>
              <FormControl componentClass="select" placeholder="select">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </FormControl>
            </FormGroup>
            <Button bsStyle="danger">Delete</Button>
          </div>
        </div>
      </Panel.Body>
    </Panel>
  )
}

export default CartCard
