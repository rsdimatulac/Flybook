import React, { useEffect }  from 'react';
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../store/user";
import SidebarRow from "./SidebarRow";
import VideoModal from "../VideoModal";
import useConsumeContext from "../../../context/ModalContext";
import FriendsModal from '../FriendsModal';
import "./Sidebar.css";


const Sidebar = ({ user }) => {
    const { showVideoModal, setShowVideoModal, showFriendsModal, setShowFriendsModal } = useConsumeContext();
    const stateUser = useSelector(state => state.user);
    const theUser = stateUser[user.id];
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getUser(user?.id));
    }, [dispatch, user.id]);


    return (
        <div className="sidebar">
            <NavLink to={`/users/${theUser?.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <SidebarRow src={theUser?.profile_src} title={`${theUser?.firstname} ${theUser?.lastname}`}/>
            </NavLink>
            <a href="https://www.cdc.gov/" style={{ textDecoration: "none", color: "inherit" }}>
                <SidebarRow src={"https://static.xx.fbcdn.net/rsrc.php/v3/yi/r/FZK_jEWapM0.png"} title="COVID-19 Information Center" />
            </a>
            <SidebarRow onFriendsClick={() => setShowFriendsModal(prevState => !prevState)} src={"https://static.xx.fbcdn.net/rsrc.php/v3/yj/r/tSXYIzZlfrS.png"} title="Friends" />
            <SidebarRow onVideoClick={() => setShowVideoModal(prevState => !prevState)} src={"https://static.xx.fbcdn.net/rsrc.php/v3/y-/r/FhOLTyUFKwf.png"} title="Watch" />
            {showVideoModal && <VideoModal />}
            {showFriendsModal && <FriendsModal user={theUser}/>}
        </div>
    );
};

export default Sidebar;
