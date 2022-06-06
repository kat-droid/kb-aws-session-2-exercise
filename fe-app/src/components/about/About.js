import React, { Component } from 'react'
import './About.css'

export default class About extends Component {
  render() {
    return (
      <div className="about">
        <h1 className="about__title">About KB App</h1>
        <p className="about__subtitle">This is a simple CRUD application with ReactJS, NodeJS, Express, and MySQL</p>
      </div>
    )
  }
}
