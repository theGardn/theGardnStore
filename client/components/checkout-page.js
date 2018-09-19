import React, { Component } from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import OrderDetailsSidebar from './order-detail-sidebar'
import {submitCheckoutThunk, applyPromo} from '../store/user'
import { Panel, Grid, Row, Col, FormGroup, ControlLabel, FormControl, Button, Form } from 'react-bootstrap'
import "./components-style/checkout-page.css"

const mapStateToProps = state => {
  const { user } = state
  return {
    cart: user.cart,
    user: user.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    submitCheckout: user => dispatch(submitCheckoutThunk(user)),
    applyPromoCode: (cart, code) => dispatch(applyPromo(cart, code))
  }
}

class CheckoutPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      firstName: this.props.user.firstName || '',
      lastName: this.props.user.lastName || '',
      email: this.props.user.email || '',
      creditCardNumber: '',
      cvc: '',
      expyMonth: '',
      expyYear: '',
      promo: '',
      promoApplied: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handlePromo = this.handlePromo.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (event) {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit (event) {
    event.preventDefault();
    const {firstName, lastName, email, creditCardNumber, cvc, expyMonth, expyYear, promo} = event.target;

    const {submitCheckout, user} = this.props;
    submitCheckout(user);
    this.props.history.push('/purchaseinfo')
    console.log(firstName.value, lastName.value, email.value, creditCardNumber.value, cvc.value, expyMonth.value, expyYear.value);
  }

  handlePromo () {
    this.props.applyPromoCode(this.props.cart, this.state.promo)
    this.setState({ promoApplied: true })
  }

  render () {
    const { submitCheckout, applyPromoCode, user, cart } = this.props;
    const {handleChange} = this;
    const { firstName, lastName, email, creditCardNumber, cvc, expyMonth, expyYear, promo } = this.state;

    return (
      <div id='checkout-container'>
        <Grid>
          <Row>
            <h1>Payment Details</h1>
            <div id='checkout-page-content'>
            <Col xs={12} sm={8}>
                <Panel>
                  <Panel.Body>
                  <form onSubmit={this.handleSubmit}>
                    <FormGroup
                      controlId="formControlsFirstName"
                      className="form-group"
                    >
                      <ControlLabel>FIRST NAME</ControlLabel>
                      <FormControl
                        type='text'
                        value={firstName}
                        name='firstName'
                        placeholder='Jane'
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <FormGroup
                      controlId="formControlsLastName"
                      className="form-group"
                    >
                      <ControlLabel>LAST NAME</ControlLabel>
                      <FormControl
                        type='text'
                        value={lastName}
                        name='lastName'
                        placeholder='Doe'
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <FormGroup
                      controlId="formControlsEmail"
                      className="form-group"
                    >
                      <ControlLabel>EMAIL</ControlLabel>
                      <FormControl
                        type='email'
                        value={email}
                        name='email'
                        placeholder='jane@doe.com'
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <FormGroup
                      controlId="formControlsCreditCard"
                      className="form-group"
                      id='credit-card-input'
                    >
                      <ControlLabel>CREDIT CARD NUMBER</ControlLabel>
                      <FormControl
                        type='text'
                        value={creditCardNumber}
                        name='creditCardNumber'
                        placeholder='0000-0000-0000-0000'
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <FormGroup
                      controlId="formControlsCVC"
                      className="form-group"
                      id='cvc-input'
                    >
                      <ControlLabel>CVC</ControlLabel>
                      <FormControl
                        type='text'
                        value={cvc}
                        name='cvc'
                        placeholder='000'
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <FormGroup
                      controlId="formControlsExpyMonth"
                      className="form-group"
                      id='expy-month-input'
                    >
                      <ControlLabel>Expy Month</ControlLabel>
                      <FormControl
                        type='text'
                        value={expyMonth}
                        name='expyMonth'
                        placeholder='Month'
                        onChange={handleChange}
                        componentClass='select'
                      >
                        <option value="Jan">Jan</option>
                        <option value="Feb">Feb</option>
                        <option value="Mar">Mar</option>
                        <option value="Apr">Apr</option>
                        <option value="May">May</option>
                        <option value="Jun">Jun</option>
                        <option value="Jul">Jul</option>
                        <option value="Aug">Aug</option>
                        <option value="Sep">Sep</option>
                        <option value="Oct">Oct</option>
                        <option value="Nov">Nov</option>
                        <option value="Dec">Dec</option>
                      </FormControl>
                    </FormGroup>
                    <FormGroup
                      controlId="formControlsExpyYear"
                      className="form-group"
                      id='expy-year-input'
                    >
                      <ControlLabel>Expy Month</ControlLabel>
                      <FormControl
                        type='text'
                        value={expyYear}
                        name='expyYear'
                        placeholder='Year'
                        onChange={handleChange}
                        componentClass='select'
                      >
                        <option value="2018">2018</option>
                        <option value="2019">2019</option>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                        <option value="2028">2028</option>
                        <option value="2029">2029</option>
                      </FormControl>
                    </FormGroup>
                    <Form inline>
                      <FormGroup
                        controlId="formControlsPromo"
                        className="form-group"
                        id='promo-input'
                      >
                        <ControlLabel>APPLY PROMO CODE</ControlLabel>{'  '}
                        <FormControl
                          type='text'
                          value={promo}
                          name='promo'
                          placeholder='Enter Promo Code Here'
                          onChange={handleChange}
                        />{'  '}
                        <Button bsStyle="success" onClick={this.handlePromo}>APPLY</Button>
                        <FormControl.Static id="promo-message">{this.state.promoApplied ? "Everything is 50% Off! Thanks, Dakota!" : null}</FormControl.Static>
                      </FormGroup>
                    </Form>
                    <Button bsStyle="success" type="submit" id="submit-order-button">
                      SUBMIT ORDER
                    </Button>
                  </form>
                </Panel.Body>
              </Panel>
            </Col>
            <Col xs={12} sm={4}>
              <div id="checkout-page-order-details">
                <OrderDetailsSidebar hideButton={true}/>
              </div>
            </Col>
          </div>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CheckoutPage));
