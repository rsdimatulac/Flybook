import React from 'react';
import { NavLink } from "react-router-dom";
import SidebarRow from "./SidebarRow";
import VideoModal from "../VideoModal";
import useConsumeContext from "../../../context/ModalContext";
import "./Sidebar.css";


const Sidebar = ({ user }) => {
    const { showVideoModal, setShowVideoModal } = useConsumeContext();

    return (
        <div className="sidebar">
            <NavLink to={`/users/${user?.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <SidebarRow src={user?.profile_src} title={`${user?.firstname} ${user?.lastname}`}/>
            </NavLink>
            <a href="https://www.cdc.gov/" style={{ textDecoration: "none", color: "inherit" }}>
                <SidebarRow src={"https://static.xx.fbcdn.net/rsrc.php/v3/yi/r/FZK_jEWapM0.png"} title="COVID-19 Information Center" />
            </a>
            <SidebarRow src={"https://static.xx.fbcdn.net/rsrc.php/v3/yj/r/tSXYIzZlfrS.png"} title="Friends" />
            <SidebarRow onVideoClick={() => setShowVideoModal(prevState => !prevState)} src={"https://static.xx.fbcdn.net/rsrc.php/v3/y-/r/FhOLTyUFKwf.png"} title="Watch" />
            {showVideoModal && <VideoModal />}
        </div>
    )
}

export default Sidebar;
