import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './Detail.css'

export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      frontend: {}
    }
  }

  async componentDidMount() {
    this.getFrontend();
  }

  getFrontend() {
    let url = window.location.href;
    let segment = url.split("/").pop();
    let request = '/contact/' + segment;

    fetch(request)
      .then(response => response.json())
      .then(data => {
        this.setState({
          frontend: data
        });
      });
  }

  render() {
    const user = this.state.frontend;
    return (
      <div className="detail">
        <Link to='/' className="contact__actions-link"> <button type="button" className="btn btn-secondary">Back</button> </Link>
        
        <h2 className="detail-title">Contact Details</h2>

        <div className="detail-card card">
          <div className="detail-card__thumb">
            <img src="https://www.pngkey.com/png/full/115-1150152_default-profile-picture-avatar-png-green.png" alt="profile-picture" className="detail-card__img" />
          </div>

          <h1>{user.name}</h1>
          <p className="detail-card__title">Phone: {user.phone}</p>
          <p className="detail-card__title">Email: {user.email}</p>
          <button className="detail-card__button">Add to Favorites</button>
        </div>

      </div>
    )
  }
}
