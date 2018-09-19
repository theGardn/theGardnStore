import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Panel, Button, Table } from 'react-bootstrap'
import {withRouter} from 'react-router-dom'

import ListingItem from './listingItem'

class Listing extends Component {
    constructor(props){
        super(props)
    }

    tellMeMore(evt){
        console.log('click the ')
    }

    render(){
        const { products } = this.props
        if(!this.props.products || this.props.products.length == 0){
            
            return (
                <div>
                    <div className='noFoundMessage'>Products no found</div>
                    
                </div>
            )
        }

        return (
            <div>
                <Table responsive hover >
                    <thead>
                    {
                        this.props.products.map((product) => {
                            return <ListingItem product={product} key={product.id} />
                        })
                    }
                    </thead>
                </Table>
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

export default withRouter(Listing)
// export default withRouter(connect(mapProps, mapDispatch)(Listing))


