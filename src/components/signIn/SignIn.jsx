import React, { Component } from "react";
import "./SignIn.scss";

import FormInput from "../formInput/FormInput";
import CustomButton from "../customButon/CustomButton";
export default class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  // Metodo para controlar al momento de hacer submit
  handleSubmit = event => {
    event.preventDefault();

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
            value={this.state.email}
            required
            label="password"
            handleChange={this.handleChange}
          />

          <CustomButton type="submit" value="Submit Form">
            Sign In
          </CustomButton>
        </form>
      </div>
    );
  }
}
