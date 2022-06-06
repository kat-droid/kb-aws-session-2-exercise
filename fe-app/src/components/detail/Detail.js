import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './Detail.css'
import profilePicture from './profile-picture.png';
import Loading from '../loading/Loading';
import axios from 'axios';

export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      frontend: {},
      isLoading: false,
    }
  }

  async componentDidMount() {
    this.getContactDetails();
  }

  getContactDetails() {
    let url = window.location.href;
    let segment = url.split("/").pop();
    let request = '/contacts/' + segment;
    
    // let serverlessAPIurl = 'https://9n0pi8hue4.execute-api.ap-southeast-1.amazonaws.com/dev-1/contacts/' + segment;
    

    this.setState({
      isLoading: true,
    })

    axios.get(request)
      .then(res => {
        this.setState({
          frontend: res.data,
          isLoading: false
        });
      })
      .catch(error => { 
        console.log('error', error);
      })
  }

  render() {
    const user = this.state.frontend;
    const isLoading = this.state.isLoading;

    return (
      <div className="detail">
        <Link to='/' className="contact__actions-link"> <button type="button" className="btn btn-secondary">Back</button> </Link>
        <h2 className="detail-title">Contact Details</h2>
        {
          isLoading ? (<Loading />) : (
            <div className="detail-card card">
              <div className="detail-card__thumb">
                <img src={profilePicture} alt="profile" className="detail-card__img" />
              </div>

              <h1>{user.name}</h1>
              <p className="detail-card__title">Phone: {user.phone}</p>
              <p className="detail-card__title">Email: {user.email}</p>
              <button className="detail-card__button">Add to Favorites</button>
            </div>
          )
        }
      </div>
    )
  }
}
