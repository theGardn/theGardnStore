import React from 'react'
import {connect} from 'react-redux'
import SimpleCard from './simple-card'
import {withRouter} from 'react-router-dom'
import {Grid, Col, Row} from 'react-bootstrap'
import "./components-style/categories.css"

export const Categories = props => {
  const {categories} = props
  return (
    <div id='all-categories-container'>
      <Grid>
        <Row>
        {categories.map(item => {
          return (
            <Col xs={12} sm={6}>
            <div id="category-container">
              <SimpleCard
                key={item.id}
                name={item.name}
                imageUrl={item.imageUrl}
                id={item.id}
                className="category-card"
                cardType="category-card-type"
              />
            </div>
            </Col>
          )
        })}
        </Row>
      </Grid>
    </div>
  )
}

const mapState = state => {
  return {
    categories: state.categories.categories
  }
}

export default withRouter(connect(mapState)(Categories))
