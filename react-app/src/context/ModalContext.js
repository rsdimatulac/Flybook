import React, { createContext, useState, useContext } from "react";

const context = createContext();

export const ModalContext = (props) => {
    const [showSignUp, setShowSignUp] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <context.Provider value={{ showSignUp, setShowSignUp, showDropdown, setShowDropdown}}>
            {props.children}
        </context.Provider>
    )
}

export default function useConsumeContext() {
    return useContext(context);
};
