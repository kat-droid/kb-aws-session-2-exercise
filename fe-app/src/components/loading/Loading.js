import React, { Component } from 'react'
import './Loading.css'

export default class Loading extends Component {
  render() {
    return (
      <div className="loading">
          <div className="loading__loader"></div>
      </div>
    )
  }
}
