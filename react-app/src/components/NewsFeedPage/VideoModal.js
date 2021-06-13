import React from 'react';
import { Modal } from "../../context/Modal";
import useConsumeContext from "../../context/ModalContext";
import "./VideoModal.css";


const VideoModal = () => {
    const { setShowVideoModal } = useConsumeContext();

    return (
        <>
            <Modal onClose={() => setShowVideoModal(prevState => !prevState)}>
                <div className="video__modal">
                    <h1>Welcome to Flybook!</h1>
                    <h3>Hi, I'm Renerose, creator of Flybook. Thank you for visiting! <br />Watch how I did on my first solo flight. Safe skies! 😊</h3>
                    <iframe className="iframe__video" width="560" height="315" src="https://www.youtube.com/embed/j4oS2QsaTB4" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
                    </iframe>
                </div>
            </Modal>
        </>
    );
};

export default VideoModal;
