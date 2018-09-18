import React from 'react'
import {connect} from 'react-redux'
import SimpleCard from './simple-card'
import {withRouter} from 'react-router-dom'
import {setItem} from '../store/products'
import {Grid, Row, Col} from 'react-bootstrap';

export const AllProducts = props => {
  const {products, setCurrentItem} = props
  return (
    <div id="all-products-container">
      <Grid>
        <Row>
          {products.map(item => {
            if (item.categoryId === Number(props.match.params.id)) {
              return (
                <Col xs={6} sm={3}>
                  <div>
                  <SimpleCard
                    key={item.id}
                    name={item.name}
                    imageUrl={item.imageUrl}
                    price={item.price}
                    id={item.id}
                    onClick={setCurrentItem(item.id)}
                  />
                  </div>
                </Col>
              )
            }
          })}

        </Row>
      </Grid>
    </div>
  )
}

const mapState = state => {
  return {
    products: state.products.allItems
  }
}

const mapDispatch = dispatch => {
  return {
    setCurrentItem: async id => {
      await dispatch(setItem(id))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(AllProducts))
