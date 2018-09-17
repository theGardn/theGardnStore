import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Panel, Image} from 'react-bootstrap'
import './components-style/navbar.css'

export default class simpleCard extends Component {
  render() {
    const {name, imageUrl, id} = this.props
    const path = this.props.price ? `/product/${id}` : `/category/${id}`
    return (
      <Link to={path}>
        <div id="simple-card">
        <Panel className="col-sm-12" prod={id}>
          <Panel.Body id="simple-card-body">
            <div id="card-img">
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
        </div>
      </Link>
    )
  }
}
