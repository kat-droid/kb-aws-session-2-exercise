import React, { Component } from 'react'
import './Favorites.css'

export default class Favorites extends Component {
  render() {
    return (
      <div className="favorites">
        <h1 className="favorites__title">Your Favorites</h1>
        <p className="favorites__subtitle">Unavailable</p>
      </div>
    )
  }
}
