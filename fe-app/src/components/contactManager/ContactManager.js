import React, { Component } from 'react'
import './ContactManager.css';
import { Link } from "react-router-dom";
import Loading from '../loading/Loading';
import AddContact from '../addContact/AddContact';
import axios from 'axios';

export default class ContactManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      userEdit: [],
      isLoading: false,
      isEmpty: false,
      getContactsErrorMsg: '',
    }
  }

  async componentDidMount() {
    if (this.state.contacts?.length === 0) {
      this.getContactList();
    }
  }

  getContactList() {
    const url = "/contacts"; // request url for elastic beanstalk
    const serverlessAPIurl = 'https://9n0pi8hue4.execute-api.ap-southeast-1.amazonaws.com/dev-1/contacts'; // request url for serverless
    this.setState({
      isLoading: true
    });

    axios.get(serverlessAPIurl)
      .then(res => {
        if (res.data.length > 0) {
          this.setState({
            contacts: res.data,
            isLoading: false,
            isEmpty: false,
          })
        } else {
          this.setState({
            isEmpty: true,
            isLoading: false,
            getContactsErrorMsg: ( res.data.errorMessage || 'No data found')
          })
        }
      })
      .catch(error => { 
        console.log('error', error);
      })
  }

  handleAddContact = async (name, phone, email) => {
    const url = "/contacts"; // request url for elasticbeanstalk
    const serverlessAPIurl = 'https://9n0pi8hue4.execute-api.ap-southeast-1.amazonaws.com/dev-1/contacts/insert'; // request url for serverless
    const req = {
      name,
      phone,
      email
    }

    axios.post(serverlessAPIurl, req)
      .then(res => {
        let id = res.data.id; // id response for serverless
        let newContact = { name, phone, email, id }; // new contact for serverless

        // let id = res.data.insertId; // id response for elastic beanstalk
        // let newContact = { name, phone, email, id }; // new contact for elastic beanstalk

        this.setState({
          contacts: [...this.state.contacts, newContact]
        })
      })
      .catch(error => { 
        console.log('error', error);
      })
  };

  handleEdit = async (name, phone, email, id, e) => {
    this.setState({
      userEdit: [{ name, phone, email, id }],
    });

    let errorMessages = document.querySelectorAll('.add-contact__input-error');
    for (var i = 0; i < errorMessages.length; ++i) {
      errorMessages[i].classList.add('hide');
    }
  }

  handleUpdateContact = async (name, phone, email, id) => {
    const users = this.state.contacts;
    const url = `/contacts/${id}`; // request url for elastic beanstalk
    const serverlessAPIurl = 'https://9n0pi8hue4.execute-api.ap-southeast-1.amazonaws.com/dev-1/contacts/update'; // request url for serverless
    const req = {
      name,
      phone,
      email,
      id
    }

    axios.put(serverlessAPIurl, req,  {
      params: {
        id: id
      },
    })
      .then(res => {
        let updatedUsers = users.map((user) => {
          if (user.id === id) {
            user.name = name;
            user.phone = phone;
            user.email = email;
          }
          return user;
        });

        this.setState({
          contacts: updatedUsers,
          userEdit: []
        });
      })
      .catch(error => { 
        console.log('error', error);
      })
  };

  handleDeleteContact = async (id) => {
    let users = this.state.contacts;
    const url = `/contacts/${id}`; // request url for elastic beanstalk
    const serverlessAPIurl = 'https://9n0pi8hue4.execute-api.ap-southeast-1.amazonaws.com/dev-1/contacts/delete'; // request url for serverless
    const req = { id };

    axios.delete(serverlessAPIurl, {
      data: {
        id: `${id}`,
      },
    })
      .then(res => {
        let updatedUsers = users.filter((user) => user.id !== id);
        this.setState({
          contacts: updatedUsers,
        });
      })
      .catch(error => { 
        console.log('error', error);
      })
  };

  addToFavorites = (user, e) => {
    e.preventDefault();
    alert(user + ' is added to your favorties');
  };


  render() {
    const data = this.state.userEdit;
    const isLoading = this.state.isLoading;
    const isEmpty = this.state.isEmpty;
    const getContactsErrorMsg = this.state.getContactsErrorMsg;

    return (
      <div className="contact-manager">
        <AddContact addContact={this.handleAddContact} handleUpdate={this.handleUpdateContact} data={data} />

        <h2 className="contact-manager__title">My Contacts</h2>

        {
          isLoading ? (<Loading />) :
            (
              <div>
                {
                  isEmpty ? 
                    (<div className='contact-manager__error-wrap'>
                      <p className='contact-manager__error-lbl'>Error: </p>
                      <p className='contact-manager__error-msg'>{getContactsErrorMsg}</p> 
                    </div>) : 
                    (
                    <table id="customers" className="table">
                    <tbody>
                      <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>Actions</th>
                      </tr>
    
                      {
                        (this.state.contacts.map(user =>
                          <tr className="contacts__item-wrap" key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.phone}</td>
                            <td>{user.email}</td>
                            <td>
                              <Link to={`/contact/${user.id}`} className="contact__actions-link"> <button type="button" className="btn btn-primary contacts__actions-button">View</button> </Link>
                              <button type="button" className="btn btn-secondary contacts__actions-button" onClick={(e) => this.handleEdit(user.name, user.phone, user.email, user.id, e)}>Update</button>
                              {/* <Link to="/contact/favorites" className="contact__actions-link"> <button type="button" className="btn btn-success contacts__actions-button">Favorite</button> </Link> */}
                              <button type="button" className="btn btn-danger contacts__actions-button" onClick={() => this.handleDeleteContact(user.id)}>Delete</button>
                              {/* <button onClick={(e) => this.addToFavorites(user.name, e)} className="contacts__actions-fav"><img className="contacts__actions-icon" src={starIcon} /></button> */}
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                    </table>
                    )
                }
              </div>
            )
        }


      </div>
    )
  }
}

