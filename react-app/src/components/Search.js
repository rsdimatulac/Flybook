import React from 'react';
import { useHistory } from "react-router-dom";
import { Avatar } from '@material-ui/core';
import "./Search.css";


const Search = ({ setShowSearch, searchResults, currentUser, setSearchResults, setSearchInput }) => {
    const history = useHistory();

    const handleUserClick = (userID) => () => {
        history.push(`/users/${userID}`);
        setSearchResults([]);
        setSearchInput("");
        setShowSearch(false);
    };

    return (
        <div className="search">
            {searchResults.length === 0 ? <div className="no__results">No results</div> : searchResults.map(user => (
                <div className={`${user.id} search__results`} key={user.id} onClick={handleUserClick(user.id)}>
                    <div className="searchResults__avatar">
                        <Avatar src={user.profile_src}/>
                    </div>
                    <div className="searchResults__name">
                        <h3>{user.firstname} {user.lastname}</h3>
                        {currentUser.id === user.id ? <p>You</p> : ""}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Search;
