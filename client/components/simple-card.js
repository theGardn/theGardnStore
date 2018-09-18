import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Panel, Image} from 'react-bootstrap'

export default class simpleCard extends Component {
  render() {
    const {name, imageUrl, id, cardType} = this.props
    const path = this.props.price ? `/product/${id}` : `/category/${id}`
    return (
      <Link to={path}>
        <Panel className={cardType === "category-card-type" ? "col-sm-12 category-card" : "simple-card"} prod={id}>
          <Panel.Body id="simple-card-body">
            <div id={cardType === "category-card-type" ? "category-card-img" : "card-img"}>
              <Image src={imageUrl} rounded />
            </div>
            <div id="simple-card-info" className="col-sm-12">
              <div id="simple-card-name">{name}</div>
              {this.props.price ? (
                <div id="simple-card-price">${this.props.price}</div>
              ) : (
                ''
              )}
            </div>
          </Panel.Body>
        </Panel>
      </Link>
    )
  }
}
