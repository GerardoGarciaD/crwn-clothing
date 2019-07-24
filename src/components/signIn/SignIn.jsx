import React, { Component } from "react";
import "./SignIn.scss";

import FormInput from "../formInput/FormInput";
import CustomButton from "../customButon/CustomButton";

import { auth, signInWithGoogle } from "../../firebase/Firebase.utils";

export default class SignIn extends Component {
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

    // Se obtienen los valores del estado
    const { email, password } = this.state;

    try {
      // Se utiliza la funcion de firebase para iniciar sesion con usuario y contraseña
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ email: "", password: "" });
    } catch (error) {
      console.log(error);
    }

    this.setState({ email: "", password: "" });
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
            <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
              Sign In with Google
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}
