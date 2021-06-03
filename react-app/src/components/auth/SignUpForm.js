import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();


  const dayArr = Array.from(new Array(31), (el, index) => index + 1);
  const dayOptions = dayArr.map(day => {
    return <option value={day} key={day}>{day}</option>
  });

  const yearArr = Array.from(new Array(101), (el, index) => index + 1921).reverse();
  const yearOptions = yearArr.map(year => {
    return <option value={year} key={year}>{year}</option>
  });

  const resetValues = () => {
    setFirstname("");
    setLastname("");
    setEmail("");
    setMonth("");
    setDay("");
    setYear("");
    setPassword("");
    setConfirmPassword("");
    setErrors([]);
  }

  const onSignUp = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      const data = await dispatch(signUp({ firstname, lastname, email, birthday: `${year}-${month}-${day}`, password}));
      if (data?.errors) {
        setErrors(data?.errors);
      }
      resetValues();
      return;
    } else if (password !== confirmPassword) {
      const valErrors = [...errors, "Passwords must match."]
      setErrors(valErrors);
    } else if (`${year}-${month}-${day}` === "--") {
      const valErrors = [...errors, "Birthday is required."]
      setErrors(valErrors);
    }
  };

  useEffect(() => {
    if (user) {
      history.push(`/`);
    }
  }, [user, history])


  return (
    <form onSubmit={onSignUp}>
      <div>
        <div className="errors">
          {errors?.map((error) => (
            <div key={error}>・{error}</div>
          ))}
        </div>
        <input
          type="text"
          name="firstname"
          onChange={(e) => setFirstname(e.target.value)}
          value={firstname}
          placeholder="First name"
          autoComplete="off"
          required
        ></input>
      </div>
      <div>
        <input
          type="text"
          name="lastname"
          onChange={(e) => setLastname(e.target.value)}
          value={lastname}
          placeholder="Last name"
          autoComplete="off"
          required
        ></input>
      </div>
      <div>
        <input
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Email"
          autoComplete="off"
          required
        ></input>
      </div>
      <div>
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Password"
          autoComplete="off"
          required
        ></input>
      </div>
      <div>
        <input
          type="password"
          name="confirm_password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          placeholder="Confirm password"
          autoComplete="off"
          required
        ></input>
      </div>
      <div>
        <label>Birthday</label>
        <div>
          <select
            placeholder="Month"
            name="month"
            onChange={(e) => setMonth(e.target.value)}
            value={month}
            required
          >
            <option value='' disabled>Month</option>
            <option value='1' key='1' >Jan</option>
            <option value='2' key='2' >Feb</option>
            <option value='3' key='3' >Mar</option>
            <option value='4' key='4' >Apr</option>
            <option value='5' key='5' >May</option>
            <option value='6' key='6' >Jun</option>
            <option value='7' key='7' >Jul</option>
            <option value='8' key='8' >Aug</option>
            <option value='9' key='9' >Sep</option>
            <option value='10' key='10' >Oct</option>
            <option value='11' key='11' >Nov</option>
            <option value='12' key='12' >Dec</option>
          </select>
          <select
            placeholder="Day"
            name="day"
            onChange={(e) => setDay(e.target.value)}
            value={day}
            required
          >
            <option value='' disabled>Day</option>
            {dayOptions}
          </select>
          <select
            placeholder="Year"
            name="day"
            onChange={(e) => setYear(e.target.value)}
            value={year}
            required
          >
            <option value='' disabled>Year</option>
            {yearOptions}
          </select>
        </div>
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
