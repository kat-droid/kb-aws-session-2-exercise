import React, { Component } from 'react'
import ContactManager from '../contactManager/ContactManager'
import './Home.css'

export default class Home extends Component {
  render() {
    return (
      <div className="home">

        <div className="hero-image">
          <div className="hero-text">
            <h1 className="hero-text__title">KB App</h1>
            <p className="hero-text__subtitle">This is a simple CRUD application with ReactJS, NodeJS, Express, and MySQL.</p>
          </div>
        </div>

        <ContactManager />

      </div>
    )
  }
}
