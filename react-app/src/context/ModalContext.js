import React, { createContext, useState, useContext } from "react";

const context = createContext();

export const ModalContext = (props) => {
    const [showSignUp, setShowSignUp] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showEditDeleteOptions, setShowEditDeleteOptions] = useState(false);
    const [showEditInput, setShowEditInput] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showSearch, setShowSearch] = useState(false);
    const [showPhotoModal, setShowPhotoModal] = useState(false);
    const [showCoverModal, setShowCoverModal] = useState(false);
    const [showEditProfile, setShowEditProfile] = useState(false);
    const [showVideoModal, setShowVideoModal] = useState(false);
    const [showFriendsModal, setShowFriendsModal] = useState(false);
    const [showCreatePostModal, setShowCreatePostModal] = useState(false);
    const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    return (
        <context.Provider value={{ 
            showSignUp, setShowSignUp, 
            showDropdown, setShowDropdown,
            showEditDeleteOptions, setShowEditDeleteOptions,
            showEditInput, setShowEditInput,
            searchInput, setSearchInput,
            searchResults, setSearchResults,
            showSearch, setShowSearch,
            showPhotoModal, setShowPhotoModal,
            showCoverModal, setShowCoverModal,
            showEditProfile, setShowEditProfile,
            showVideoModal, setShowVideoModal,
            showFriendsModal, setShowFriendsModal,
            showCreatePostModal, setShowCreatePostModal,
            showForgotPasswordModal, setShowForgotPasswordModal,
            showEmojiPicker, setShowEmojiPicker
        }}>
            {props.children}
        </context.Provider>
    );
};

export default function useConsumeContext() {
    return useContext(context);
};
