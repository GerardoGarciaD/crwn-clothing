import React from "react";
import SignIn from "../../components/signIn/SignIn";

import SignUp from "../../components/signUp/SignUp";
import "./SignInUp.scss";

export default function SignInUp() {
  return (
    <div className="forms-SignIn-SignUp">
      <SignIn />
      <SignUp />
    </div>
  );
}
