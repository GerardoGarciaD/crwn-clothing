import React, { useState } from "react";

import FormInput from "../formInput/FormInput";
import CustomButton from "../customButon/CustomButton";
import { connect } from "react-redux";

// Se importan la funciones para firebase
// import { auth, createUserProfileDocument } from "../../firebase/Firebase.utils";
import "./SignUp.scss";
// Se importa accion que escucha las sagas
import { signUpStart } from "../../redux/user/UserActions";

// Se obtienen las props del highOrderComponent (Connect)
function SignUp({ signUpStart }) {
  // Se crea el estado, en donde, el primer parametro son los valores que contendrá el estado y el segudo parametro
  // es la funcion que se ejecuta para modificar esos valores
  // En este caso el primer parametro consta de un objeto (el estado local del componente) con los datos del usuario
  // que se va a registrar en la pagina
  const [userCredentials, setUserCredentials] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  // Se obtienen los valores del estado mediante objectDestructurin
  const { displayName, email, password, confirmPassword } = userCredentials;

  const handleSubmit = async event => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("The passwords don't march");
      return;
    }
    signUpStart(email, password, displayName);
  };

  const handleChange = event => {
    const { name, value } = event.target;

    // Se actualiza el estado local con la funcion de Hooks, con el nombre del input y el valor
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="sign-up">
      <h2 className="title"> I do not have an account</h2>
      <span>Sign up with your email and a password</span>
      <form onSubmit={handleSubmit} className="sign-up-form">
        <FormInput
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleChange}
          label="Display Name"
          required
        />

        <FormInput
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          label="Email"
          required
        />

        <FormInput
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          label="Password"
          required
        />

        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          label="Confirm Password"
          required
        />

        <CustomButton type="submit">Sign Up</CustomButton>
      </form>
    </div>
  );
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
