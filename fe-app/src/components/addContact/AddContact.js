import React, { Component } from 'react'
import './AddContact.css'; 
import validator from 'validator' 

export default class AddContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
      email : "",
      id: "",
      errors: {}
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
    if(this.handleValidation()){
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
    }else{
      alert("Form has errors.")
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

  handleValidation(){

    let errorMessages = document.querySelectorAll('.add-contact__input-error');
    for (var i = 0; i < errorMessages.length; ++i) {
      errorMessages[i].classList.remove('hide');
    }

    let fields = this.state;
    let errors = {};
    let formIsValid = true;

    // name
    if(!this.validateName(fields["name"])) {
      formIsValid = false;
      errors["name"] = "Invalid Name";
    }

    // email
    if(!this.validateEmail(fields["email"])) {
      formIsValid = false;
      errors["email"] = "Invalid Email Address";
    }

    // phone
    if(!this.validatePhoneNumber(fields["phone"])) {
      formIsValid = false;
      errors["phone"] = "Invalid Mobile Phone Number";
    }

    this.setState({errors: errors});
    return formIsValid;
  }

  validatePhoneNumber = (number) => {
    return (validator.isMobilePhone(number))
  }

  validateEmail = (email) => {
    return (validator.isEmail(email))
  }

  validateName = (name) => {
    return (validator.isAlpha(name))
  }

  render() {   
    const editMode = this.props?.data?.length;
    let { name, phone, email } = editMode ? this.props.data[0] : this.state;

    return (
      <div className="add-contacts">
        {
              editMode ? ( <h2 className="add-contacts__title">Update Contact</h2>) : ( <h2 className="add-contacts__title">Add Contact</h2>)
        }
     
      <form className="add-contacts__form" id="addContactForm">
        <div className="add-contact__input-wrap">
          <label className="add-contact__input-label" htmlFor="name">Name:</label>
          <input className="add-contact__input-field js-name" placeholder="Enter Name" defaultValue={name || ''} type="text" name="name" id="name" required onChange={(e) => this.handleChange("name", e)} />
          <span className="add-contact__input-error">{this.state.errors["name"]}</span>
        </div>

        <div className="add-contact__input-wrap">
          <label className="add-contact__input-label" htmlFor="phone">Phone Number:</label>
          <input className="add-contact__input-field js-phone" placeholder="Enter Phone Number" defaultValue={phone || ''} type="phone" name="phone" id="phone" required onChange={(e) => this.handleChange("phone", e)} />
          <span className="add-contact__input-error">{this.state.errors["phone"]}</span>
        </div>

        <div className="add-contact__input-wrap">
          <label className="add-contact__input-label" htmlFor="email">Email:</label>
          <input className="add-contact__input-field js-email" placeholder="Enter Email Address" defaultValue={email || ''} type="email" name="email" id="email" required onChange={(e) => this.handleChange("email", e)} />
          <span className="add-contact__input-error">{this.state.errors["email"]}</span>
        </div>

      
        {
              editMode ? (
                <button className="add-contact__cta" onClick={this.handleUpdate}>Update</button>
              // <div>
              //     <button className="add-contact__cta" onClick={this.handleUpdate}>Update</button>
              //     <button className="add-contact__cta -cancel" onClick={this.cancelUpdate}>Cancel</button>
              // </div>
             ) : (<button className="add-contact__cta" onClick={this.handleSubmit}>Add</button>)
        }
        
      </form>
    </div>
    )
  }
}
