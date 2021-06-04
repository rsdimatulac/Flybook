import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../../store/session";

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
    <div>
      <h1>Login Form</h1>
      <form onSubmit={onLogin}>
        <div className="errors">
          {errors?.map((error) => (
            <div key={error}>・{error}</div>
          ))}
        </div>
        <div>
          <input
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        <button onClick={loginDemo}>Demo User</button>
      </form>
    </div>
  );
};

export default LoginForm;
