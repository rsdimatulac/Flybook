import React from 'react';
import { useHistory } from "react-router-dom";
import { Avatar } from '@material-ui/core';
import useConsumeContext from "../context/ModalContext";
import "./Search.css";


const Search = ({ currentUser }) => {
    const { setSearchInput, searchResults, setSearchResults, setShowSearch } = useConsumeContext();
    const history = useHistory();

    const handleUserClick = (userID) => () => {
        if (userID !== undefined) {
            history.push(`/users/${userID}`);
            setSearchResults([]);
            setSearchInput("");
            setShowSearch(false);
        };
    };

    return (
        <div className="search">
            <h1>Search<span>{searchResults.length > 0 ? searchResults.length : ""}</span></h1>
            {searchResults.length > 0
                ? <div>
                    {searchResults.map(user => (
                        <div className={`${user?.id} search__results`} key={user?.id} onClick={handleUserClick(user?.id)}>
                            <div className="searchResults__avatar">
                                <Avatar src={user.profile_src} />
                            </div>
                            <div className="searchResults__name">
                                <h3>{user.firstname} {user.lastname}</h3>
                                {currentUser?.id === user?.id ? <p>You</p> : ""}
                            </div>
                        </div>
                    ))}
                </div>
                : <p className="no__results">No results</p>
            }
        </div>
    );
};

export default Search;
