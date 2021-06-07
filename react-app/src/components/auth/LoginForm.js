import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../../store/session";
import useConsumeContext from "../../context/ModalContext";
import SignUpModal from "./SignUpForm";

import "./LoginForm.css";


const LoginForm = () => {
  const { showSignUp, setShowSignUp } = useConsumeContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogin = async (e) => {
    e.preventDefault();

    const data = await dispatch(login(email, password));
    setErrors([]);
    if (data?.errors) {
      setErrors(data?.errors);
    }
  };

  useEffect(() => {
    if (user) {
      history.push(`/feed`);
    }
  }, [user, history])

  const loginDemo = async (e) => {
    e.preventDefault();
    await dispatch(login("amelia@fb.com", "password"));
    history.push(`/feed`);
  };

  return (
    <div className="login">
      <form onSubmit={onLogin}>
        <div className="errors">
          {errors?.map((error) => (
            <div className="errors__div" key={error}>・{error}</div>
          ))}
        </div>
        <div className="login__input">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="login__input">
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="login__buttons">
          <button type="submit">Log In</button>
          <button onClick={loginDemo}>Demo User</button>
          <p>Forgot Password?</p>
          <hr />
          <div id="demo__login" onClick={() => setShowSignUp(prevState => !prevState)}><p>Create New Account</p></div>
        </div>
      </form>
      {showSignUp && <SignUpModal />}
    </div>
  );
};

export default LoginForm;
