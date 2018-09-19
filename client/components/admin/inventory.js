import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Panel, Button, Tabs, Tab } from 'react-bootstrap'
import {withRouter, Redirect} from 'react-router-dom'

import Listing from './listing'

class Inventory extends Component {

    tellMeMore(evt){
        console.log(evt.target)
        // console.log(this.props.products)
        window.location='/home'
    }

    render(){
        let shortage = []
        const { products, user } = this.props
        shortage = products.filter((product) => {
            return product.quantity < 1
        })
        // console.log('Products are: ', shortage)
        // console.log('User is: ', user)

        return (
            <div>
                <Tabs defaultActiveKey={1} id='inventoryTab'>
                    <Tab eventKey={1} title='Shortage' >
                        {/* <button type='button' onClick={this.tellMeMore}>Click Me!</button> */}
                        <Listing products={shortage} />
                    </Tab>
                    <Tab eventKey={2} title='All Products' >
                        <Listing products={products} />
                    </Tab>
                    <Tab eventKey={3} title='Search by Name' >
                    <table data-link="row">
                    <tbody>
                    <tr onClick={this.tellMeMore} href='/home'><td>This is Foo</td></tr>
                    <tr><td><a href="bar.html">Bar</a></td><td>Bar is good</td></tr>
                    </tbody>
                    </table>
                    </Tab>
                </Tabs>
            </div>
        )
    }
}


const mapProps = state => {
    return {
      currentItem: state.products.currentItem,
      products: state.products.allItems,
      user: state.user.user
    }
  }
  
  const mapDispatch = dispatch => {
    return {
      
    }
  }
  
export default withRouter(connect(mapProps, mapDispatch)(Inventory))


