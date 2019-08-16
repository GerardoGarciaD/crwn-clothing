import React, { useState } from "react";
import { connect } from "react-redux";
import "./SignIn.scss";

import FormInput from "../formInput/FormInput";
import CustomButton from "../customButon/CustomButton";

// Se importan las acciones para iniciar el proceso de iniciar sesion con sagas
import {
  googleSignInStart,
  emailSignInStart
} from "../../redux/user/UserActions";

// Se obtienen las props del highOrderComponent (Connect)

function SignIn({ emailSignInStart, googleSignInStart }) {
  // Se crea el estado, en donde, el primer parametro son los valores que contendrá el estado y el segudo parametro
  // es la funcion que se ejecuta para modificar esos valores
  // En este caso el primer parametro consta de un objeto (el estado local del componente) con el email y la contraseña
  // del usuario
  const [userCredentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  // Se obtienen los valores del estado mediante objectDestructuring
  const { email, password } = userCredentials;

  // Metodo para controlar al momento de hacer submit
  const handleSubmit = async event => {
    event.preventDefault();

    emailSignInStart(email, password);
  };

  // Evento para controlar los inputs
  const handleChange = event => {
    // Se hace destructuring del event.taget que regresa como name, el nombre del input
    // y value el valor del input
    const { value, name } = event.target;

    // Se actualiza el estado local con la funcion de Hooks, con el nombre del input y el valor
    setCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        {/* Se renderiza el componente FormInput y se mandan las props  */}
        <FormInput
          type="email"
          name="email"
          value={email}
          required
          label="email"
          handleChange={handleChange}
        />

        <FormInput
          type="password"
          name="password"
          value={password}
          required
          label="password"
          handleChange={handleChange}
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

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password }))
});

export default connect(
  null,
  mapDispatchToProps
)(SignIn);
