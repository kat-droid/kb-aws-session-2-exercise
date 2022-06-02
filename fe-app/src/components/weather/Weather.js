import React, { Component } from 'react'
import axios from 'axios'
import './Weather.css'; 

export default class Weather extends Component {
    constructor() {
        super()
        this.state = {
            weather : '...'
        }
    }

    handleButtonClick = () => {
        axios.get('/getWeather').then(response => {
            this.setState({
                weather: response.data.temp_c + '°C'
            });
        });
    }

  render() {
    return (
      <div>
          <button className="button" onClick={this.handleButtonClick}>Get Weather in Manila</button>
          <h1>The Weather in Manila is { this.state.weather }</h1>
      </div>
    )
  }
}
