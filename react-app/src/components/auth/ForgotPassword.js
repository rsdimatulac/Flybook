import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { login, authenticate, confirmEmail } from "../../store/session";
import { Modal } from "../../context/Modal";
import VisibilityIcon from '@material-ui/icons/Visibility';
import useConsumeContext from "../../context/ModalContext";
import "./ForgotPassword.css";



const ForgotPassword = () => {
    const { showForgotPasswordModal, setShowForgotPasswordModal } = useConsumeContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();

    const verifyEmail = async (e) => {
        e.preventDefault();
        // console.log("HIT THIS")
        const data = await dispatch(confirmEmail(email));
        console.log("DATA", data)
        // setErrors([]);
        // if (data?.errors) {
        //     setErrors(data?.errors);
        // } else {
        //     console.log("AUTHENTICATED")
        //     // show password input
        // }
    };

    return (
        <>
            <Modal onClose={() => setShowForgotPasswordModal(prevState => !prevState)}>
                <div className="password__modal">
                    <h1>Forgot Password</h1>
                    <form onSubmit={verifyEmail}>
                        <div className="errors">
                            {errors?.map((error) => (
                                <div className="errors__div" key={error}>・{error}</div>
                            ))}
                        </div>
                        <div className="login__input">
                            <input
                                name="confirm_email"
                                type="email"
                                placeholder="Email"
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="off"
                            />
                        </div>
                        {/* <div className="login__input">
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="visibility__icon" onClick={() => setShowPassword(prevState => !prevState)} style={{ color: showPassword ? "#050505" : "gray" }}><VisibilityIcon /></div>
                        </div> */}
                        <div className="login__buttons">
                            <button type="submit">Verify Email</button>
                            {/* <button onClick={loginDemo}>Demo User</button> */}
                            {/* <p onClick={() => setShowForgotPasswordModal(prevState => !prevState)}>Forgot Password?</p> */}
                            {/* <hr /> */}
                            {/* <div id="demo__login" onClick={() => setShowSignUp(prevState => !prevState)}><p>Create New Account</p></div> */}
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    )
}

export default ForgotPassword;
