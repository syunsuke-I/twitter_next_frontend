"use client";

import SidebarLeft from "../../../components/home/SidebarLeft";
import MainContent from "../../../components/home/MainContent";
import SidebarRight from "../../../components/home/SidebarRight";
import '../../../static/css/app.css';

export default function Top() {

  return(
    <div className="grid grid-container customGray bg-gray-600 text-white">
      <SidebarLeft/>
      <MainContent/>
      <SidebarRight/>
    </div>
  );
};