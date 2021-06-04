import React, { createContext, useState, useContext } from "react";

const context = createContext();

export const ModalContext = (props) => {
    const [showSignUp, setShowSignUp] = useState(false);

    return (
        <context.Provider value={{showSignUp, setShowSignUp}}>
            {props.children}
        </context.Provider>
    )
}

export default function useConsumeContext() {
    return useContext(context);
};
