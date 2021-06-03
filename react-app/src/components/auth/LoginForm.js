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
    if (data?.errors) {
      setErrors(data?.errors);
    }
  };

  useEffect(() => {
    if (user) {
      history.push(`/`);
    }
  }, [user, history])

  return (
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
        <button type="submit">Login</button>
      </div>
    </form>
  );
};

export default LoginForm;
