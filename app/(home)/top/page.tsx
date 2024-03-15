"use client";

import React, { useState, useEffect } from 'react';

import SidebarLeft from "../../../components/home/SidebarLeft";
import MainContent from "../../../components/home/MainContent";
import SidebarRight from "../../../components/home/SidebarRight";
import TweetFrom from "../../../components/home/TweetFrom";

import '../../../static/css/app.css';

export default function Top() {

  const [isTweetFormModalOpen, setIsTweetFormModalOpen] = useState(false);

  return(
    <div className="grid grid-container bg-gray-900 text-white">
      <SidebarLeft
        isTweetFormModalOpen={isTweetFormModalOpen}
        setIsTweetFormModalOpen={setIsTweetFormModalOpen}
      />
      <MainContent/>
      <SidebarRight/>
      {isTweetFormModalOpen && 
        <TweetFrom
          isTweetFormModalOpen={isTweetFormModalOpen}
          setIsTweetFormModalOpen={setIsTweetFormModalOpen}
        />
      }
    </div>
  );
};