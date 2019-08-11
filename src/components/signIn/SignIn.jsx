import React, { Component } from "react";
import { connect } from "react-redux";
import "./SignIn.scss";

import FormInput from "../formInput/FormInput";
import CustomButton from "../customButon/CustomButton";

// Se importan las acciones para iniciar el proceso de iniciar sesion con sagas
import {
  googleSignInStart,
  emailSignInStart
} from "../../redux/user/UserActions";

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  // Metodo para controlar al momento de hacer submit
  handleSubmit = async event => {
    event.preventDefault();

    // Se obtiene la funcion desde mapDispatchToProps
    const { emailSignInStart } = this.props;
    // Se obtienen los valores del estado
    const { email, password } = this.state;

    this.setState({ email: "", password: "" });
    // Se llama a la funcion (accion)
    emailSignInStart(email, password);
  };

  // Evento para controlar los inputs
  handleChange = event => {
    // Se hace destructuring del event.taget que regresa como name, el nombre del input
    // y value el valor del input
    const { value, name } = event.target;

    // Se actualiza el estado, con el nombre del input y el valor
    this.setState({ [name]: value });
  };

  render() {
    // Se obtiene la funcion (accion) desde mapDispatchToProps
    const { googleSignInStart } = this.props;

    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          {/* Se renderiza el componente FormInput y se mandan las props  */}
          <FormInput
            type="email"
            name="email"
            value={this.state.email}
            required
            label="email"
            handleChange={this.handleChange}
          />

          <FormInput
            type="password"
            name="password"
            value={this.state.password}
            required
            label="password"
            handleChange={this.handleChange}
          />

          <div className="buttons">
            <CustomButton type="submit">Sign In</CustomButton>
            <CustomButton
              type="button"
              // se llama la funcion (accion)
              onClick={googleSignInStart}
              isGoogleSignIn
            >
              Sign In with Google
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password }))
});

export default connect(
  null,
  mapDispatchToProps
)(SignIn);
