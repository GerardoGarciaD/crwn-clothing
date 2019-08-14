import React, { Component } from "react";

import FormInput from "../formInput/FormInput";
import CustomButton from "../customButon/CustomButton";
import { connect } from "react-redux";

// Se importan la funciones para firebase
// import { auth, createUserProfileDocument } from "../../firebase/Firebase.utils";
import "./SignUp.scss";
// Se importa accion que escucha las sagas
import { signUpStart } from "../../redux/user/UserActions";

class SignUp extends Component {
  constructor() {
    super();

    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  }

  handleSubmit = async event => {
    event.preventDefault();
    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("The passwords don't march");
      return;
    }

    const { signUpStart } = this.props;
    signUpStart(email, password, displayName);

    /* try {
      // Se utiliza una funcion de firebase para crear un usuario con email y contraseña
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await createUserProfileDocument(user, { displayName });

      //   Cuando se crea el usuario se actualiza el estado para borrar los datos del form
      this.setState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
    } catch (error) {
      console.log(error);
    }
     */
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const { displayName, email, password, confirmPassword } = this.state;

    return (
      <div className="sign-up">
        <h2 className="title"> I do not have an account</h2>
        <span>Sign up with your email and a password</span>
        <form onSubmit={this.handleSubmit} className="sign-up-form">
          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            onChange={this.handleChange}
            label="Display Name"
            required
          />

          <FormInput
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            label="Email"
            required
          />

          <FormInput
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            label="Password"
            required
          />

          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={this.handleChange}
            label="Confirm Password"
            required
          />

          <CustomButton type="submit">Sign Up</CustomButton>
        </form>
      </div>
    );
  }
}

// Crea el objeto  que utiliza la accion signUpStart de UserActions
const mapDispatchToProps = dispatch => ({
  signUpStart: (email, password, displayName) =>
    dispatch(signUpStart({ email, password, displayName }))
});

export default connect(
  null,
  mapDispatchToProps
)(SignUp);
