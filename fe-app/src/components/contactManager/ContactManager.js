import React, { Component } from 'react'
import './ContactManager.css';
import { Link } from "react-router-dom";
import Loading from '../loading/Loading';
import AddContact from '../addContact/AddContact';

export default class ContactManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      userEdit: []
    }
  }

  async componentDidMount() {
    if (this.state.contacts.length === 0) {
      this.getContactList();
    }
  }

  // WEP API
  getContactList() {
    fetch('https://9n0pi8hue4.execute-api.ap-southeast-1.amazonaws.com/dev-1/contacts')
    .then(response => response.json())
    .then(data => {
      this.setState({
        contacts: data.body
      })
    });
  }

  handleAddContact = async (name, phone, email) => {
    let id = this.state.contacts[this.state.contacts.length - 1].id + 1; //genarting a unique id using date
    const url = "https://jsonplaceholder.typicode.com/users";
    await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        name,
        phone,
        email
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log("Added Contact", json));

    let newContact = { name, phone, email, id };
    this.setState({
      contacts: [...this.state.contacts, newContact]
    })
  };

  handleEdit = async (name, phone, email,id, e) => {
    let activeEditUser = e.target.closest('.contacts__item-wrap');
    this.setState({
      userEdit: [{name, phone, email, id}],
    });
  }

  handleUpdateContact = async (name, phone, email, id) => {
    const users = this.state.contacts;

    const url = `https://jsonplaceholder.typicode.com/users/${id}`;
    await fetch(url, {
      method: "PUT",
      body: JSON.stringify({
        id,
        phone,
        name,
        email,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log("Updated Contact", json));

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
  };


  handleDeleteContact = async (id) => {
    let users = this.state.contacts;
    const url = `https://jsonplaceholder.typicode.com/users/${id}`;
    await fetch(url, {
      method: "DELETE",
    });

    let updatedUsers = users.filter((user) => user.id !== id);

    this.setState({
      contacts: updatedUsers,
    });
  };

  render() {
    const data = this.state.userEdit;
    
    return (
      <div className="contact-manager">
        <AddContact addContact={this.handleAddContact} handleUpdate={this.handleUpdateContact} data={data} />

        <h2 className="contact-manager__title">My Contacts</h2>

          {
              this.state.contacts.length === 0 ? (<Loading />) :
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
                      <tr className="contacts__item-wrap">
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.phone}</td>
                        <td>{user.email}</td>
                        <td>
                            <Link to={`/contact/${user.id}`} className="contact__actions-link"> <button type="button" className="btn btn-primary contacts__actions-button">View</button> </Link>
                            <button type="button" className="btn btn-secondary contacts__actions-button" onClick={(e) => this.handleEdit(user.name, user.phone, user.email, user.id, e)}>Update</button>
                            {/* <Link to="/contact/favorites" className="contact__actions-link"> <button type="button" className="btn btn-success contacts__actions-button">Favorite</button> </Link> */}
                            <button type="button" className="btn btn-danger contacts__actions-button"  onClick={() => this.handleDeleteContact(user.id)}>Delete</button>    
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
}

