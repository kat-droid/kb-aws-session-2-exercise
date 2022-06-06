import React, { Component } from 'react'
import './NotFound.css'

export default class NotFound extends Component {
  render() {
    return (
      <div className="not-found">
          <div className="not-found__wrap">
              <h1 className="not-found__title">404</h1>
              <h2 className="not-found__subtitle">Oooops...</h2>
              <p className="not-found__desc">Page not found</p>
          </div>
      </div>
    )
  }
}
