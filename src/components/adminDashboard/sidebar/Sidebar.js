/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import Main from "../main/Main";
import Spam from "../Management/Spam";
import { useSelector } from "react-redux";
import GetUsersInfo from "../Management/GetUsersInfo";


const Sidebar = () => {
  const { theme } = useSelector((state) => state);
  const [adminMenu, setAdminMenu] = useState(1);


  return (
    <>
      <div className="sidebar" id="sidebar" style={{ filter: `${theme ? "invert(1)" : "invert(0)"} ` }}>
        <div className="sidebar__title">
          <i className="fa fa-times" id="sidebarIcon" aria-hidden="true"></i>
        </div>
        <div className="sidebar__menu">
          <div className={`sidebar__link ${adminMenu === 1 && "active_menu_link"}`}
            onClick={() => setAdminMenu(1)}>
            <i className="fa fa-lock" aria-hidden="true"></i>

            <a href="#">Admin Management</a>
          </div>

          <div className={`sidebar__link ${adminMenu === 2 && "active_menu_link"}`}
            onClick={() => setAdminMenu(2)}>
            <i className="fa fa-ban"></i>
            <a href="#">Spams Management</a>
          </div>

          <div className={`sidebar__link ${adminMenu === 3 && "active_menu_link"}`}
            onClick={() => setAdminMenu(3)}>
            <i className="fas fa-user-alt"></i>
            <a href="#">Users Management</a>
          </div>

        </div>
        {adminMenu === 1 && <Main />}
        {adminMenu === 2 && <Spam />}
        {adminMenu === 3 && <GetUsersInfo />}
      </div>
    </>
  );
};

export default Sidebar;
