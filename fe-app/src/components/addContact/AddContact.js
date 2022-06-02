import React, { Component } from 'react'
import './AddContact.css'; 

export default class AddContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
      email : "",
      id: "",
    };
  }

  handleChange = (inputType, e) => {
    if (inputType === "name") {
      this.setState({
        name: e.target.value,
      });
    } else if (inputType === "phone") {
      this.setState({
        phone: e.target.value,
      });
    } else {
      this.setState({
        email: e.target.value,
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, phone, email } = this.state;
    const { addContact } = this.props;
    if (name && phone) {
      addContact(name, phone, email);
      this.setState({
        name: "",
        phone: "",
        email: "",
      });

      document.getElementById("addContactForm").reset();
    }
  };

  handleUpdate = (e) => {
    e.preventDefault();
    let { name, phone, email, id } = this.state;
    id = this.props?.data[0]?.id;
    name = document.querySelector('#name').value;
    email = document.querySelector('#email').value;
    phone = document.querySelector('#phone').value;

    const { handleUpdate } = this.props;



    if (name || phone || email) {
      handleUpdate(name, phone, email, id);

      this.setState({
        name: "",
        phone: "",
        email: "",
      });

      document.getElementById("addContactForm").reset();
    }
  };

  cancelUpdate = (e) => {
    e.preventDefault();
    document.getElementById("addContactForm").reset();
  }

  render() {   
    const editMode = this.props.data.length;
    let { name, phone, email } = editMode ? this.props.data[0] : this.state;

    return (
      <div className="add-contacts">
        {
              editMode ? ( <h2>Update Contact</h2>) : ( <h2>Add Contact</h2>)
        }
     
      <form className="add-contacts__form" id="addContactForm">
        <label className="add-contact__input-label" htmlFor="name">Name:</label>
        <input className="add-contact__input-field" placeholder="Enter Name" defaultValue={name || ''} type="text" name="name" id="name" required onChange={(e) => this.handleChange("name", e)} />


        <label className="add-contact__input-label" htmlFor="phone">Phone Number:</label>
        <input className="add-contact__input-field" placeholder="Enter Phone Number" defaultValue={phone || ''} type="phone" name="phone" id="phone" required onChange={(e) => this.handleChange("phone", e)} />

        <label className="add-contact__input-label" htmlFor="email">Email:</label>
        <input className="add-contact__input-field" placeholder="Enter Email Address" defaultValue={email || ''} type="email" name="email" id="email" required onChange={(e) => this.handleChange("email", e)} />

        {
              editMode ? (
              <div>
                  <button className="add-contact__cta" onClick={this.handleUpdate}>Update</button>
                  <button className="add-contact__cta -cancel" onClick={this.cancelUpdate}>Cancel</button>
              </div>
             ) : (<button className="add-contact__cta" onClick={this.handleSubmit}>Add</button>)
        }
        
      </form>
    </div>
    )
  }
}
