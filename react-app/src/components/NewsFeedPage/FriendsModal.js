import React from 'react';
import { useHistory } from "react-router-dom";
import { BsThreeDots as Options } from "react-icons/bs";
import { Modal } from "../../context/Modal";
import useConsumeContext from "../../context/ModalContext";
import "./FriendsModal.css";


const FriendsModal = ({ user }) => {
    const { setShowFriendsModal } = useConsumeContext();
    const history = useHistory();

    return (
        <>
            <Modal onClose={() => setShowFriendsModal(prevState => !prevState)}>
                <div className="friends__modal">
                    <h1>Friends<span>{user?.friends.length > 0 ? user?.friends.length : ""}</span></h1>
                    {user?.friends.length > 0
                        ? <div>
                            {user?.friends?.map(friend => (
                                <div className="each__friendModal" key={friend?.id} >
                                    <div className="each__friendModalImg" onClick={() => history.push(`/users/${friend?.id}`)}><img src={friend?.profile_src} alt="" /></div>
                                    <div className="each__friendModalName" >
                                        <h3 onClick={() => history.push(`/users/${friend?.id}`)}>{friend?.firstname} {friend?.lastname}</h3>
                                    </div>
                                    <div className={`${friend?.id} friend__modalIcon`}>
                                        <Options />
                                    </div>
                                </div>
                            ))}
                        </div>
                        : <p className="no__friendsModal">No friends</p>
                    }
                </div>
            </Modal>
        </>
    );
};

export default FriendsModal;
