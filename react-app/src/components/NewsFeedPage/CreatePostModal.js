import React from 'react';
import { Modal } from "../../context/Modal";
import CreatePost from "./Feed/CreatePost";
import useConsumeContext from "../../context/ModalContext";
import "./CreatePostModal.css";


function CreatePostModal({user}) {
    const { setShowCreatePostModal } = useConsumeContext();

    return (
        <>
            <Modal onClose={() => setShowCreatePostModal(prevState => !prevState)}>
                <div className="createPost__modal">
                    <h1>Share a Post</h1>
                    <CreatePost user={user}/>
                </div>
            </Modal>
        </>
    );
};

export default CreatePostModal
