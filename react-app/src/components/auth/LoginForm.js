import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../../store/session";
import "./LoginForm.css";


const LoginForm = () => {
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

  const showSignUpModal = () => {

  }

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
            <div key={error}>・{error}</div>
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
          <div>Forgot Password?</div>
          <hr />
          <button id="demo__login" onClick={showSignUpModal}>Create New Account</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
