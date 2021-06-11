import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from 'react-router-dom';
import { signUp, login } from '../../store/session';
import { Modal } from "../../context/Modal";
import VisibilityIcon from '@material-ui/icons/Visibility';
import useConsumeContext from "../../context/ModalContext";
import "./SignUpForm.css";


const SignUpForm = () => {
  const { setShowSignUp } = useConsumeContext();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
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

  const onSignUp = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      const data = await dispatch(signUp({ firstname, lastname, email, birthday: `${year}-${month}-${day}`, password }));
      setErrors([]);
      if (data?.errors) {
        setErrors(data?.errors);
      } else {
        setShowSignUp(false);
      }
    } else if (password !== confirmPassword) {
      const valErrors = [...errors, "Passwords must match."]
      setErrors(valErrors);
    } else if (`${year}-${month}-${day}` === "--") {
      const valErrors = [...errors, "Birthday is required."]
      setErrors(valErrors);
    }
  };

  const loginDemo = async (e) => {
    e.preventDefault();
    await dispatch(login("amelia@fb.com", "password"));
    history.push(`/feed`);
    setShowSignUp(false);
  };

  useEffect(() => {
    if (user) {
      history.push(`/feed`);
    }
  }, [user, history])


  return (
    <>
      <Modal onClose={() => setShowSignUp(prevState => !prevState)}>
        <div className="signup">
          <div className="signup__header">
            <h1>Sign Up</h1>
            <p>It's quick and easy.</p>
          </div>
          <hr />
          <form onSubmit={onSignUp}>
            <div className="errors">
              {errors?.map((error) => (
                <div className="errors__div" key={error}>・{error}</div>
              ))}
            </div>
            <div className="signup__name">
              <div className="signup__input">
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
              <div className="signup__input">
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
            </div>
            <div className="signup__input">
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
            <div className="signup__input">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Password"
                autoComplete="off"
                required
              ></input>
              <div className="visibility__iconPassword" onClick={() => setShowPassword(prevState => !prevState)} style={{ color: showPassword ? "#050505" : "gray" }}><VisibilityIcon /></div>
            </div>
            <div className="signup__input">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirm_password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                placeholder="Confirm password"
                autoComplete="off"
                required
              ></input>
              <div className="visibility__iconPassword" onClick={() => setShowConfirmPassword(prevState => !prevState)} style={{ color: showConfirmPassword ? "#050505" : "gray" }}><VisibilityIcon /></div>
            </div>
            <div className="signup__birthday">
              <p>Birthday</p>
              <div className="birthday__div">
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
            <div className="signup__terms">
              <p>By clicking Sign Up, you agree to our Terms, Data Policy and Awesomeness.</p>
            </div>
            <div className="signup__buttons">
              <div id="signup__demo" onClick={loginDemo}><p>Demo User</p></div>
              <button type="submit">Sign Up</button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default SignUpForm;
