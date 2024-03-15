"use client"

import React, { useState, useEffect } from 'react';

import { IconContext } from 'react-icons'
import { IoPersonCircleOutline } from "react-icons/io5";

import {TweetForm} from "../../types/home/home";
import { UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';

import useTweetForm from "../../hooks/home/useTweetForm";

interface Tweet {
  Content: string;
}

interface TweetFormProps {
  onSubmit: (content: string) => void;
}

interface TweetsDisplayProps {
  tweets: Tweet[];
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

interface Props{
  onSubmit: (data: TweetForm) => Promise<void>;
  handleSubmit : UseFormHandleSubmit<{content: string;}, undefined>
  register:UseFormRegister<{content: string;}>
}

const TweetsDisplay: React.FC<TweetsDisplayProps> = ({ tweets }) => {
  return (
    <>
      {tweets.map((tweet, index) => (
        <div key={index} className="flex flex-col w-full max-w-2xl">
            <div className="flex p-6 border-b border-gray-700">
              <i className="bi bi-person-circle"></i>
              <div className="ml-4 flex flex-col">
                <span className="font-bold text-white">test_user</span>
                <span className="text-gray-500">@test_user</span>
                <div className="text-gray-300 mt-2">
                  test
                </div>
              </div>
            </div>
        </div>
      ))}
    </>
  );
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Page navigation example" className="flex justify-center">
      <ul className="flex items-center -space-x-px h-10 text-base">
        {currentPage > 1 && (
          <li>
            <a
              href="#"
              onClick={() => onPageChange(currentPage - 1)}
              className="flex items-center justify-center px-12 h-10 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
            >
              <span className="sr-only">Previous</span>
              {/* SVG for previous */}
            </a>
          </li>
        )}
        {pages.map(page => (
          <li key={page}>
            <a
              href="#"
              onClick={() => onPageChange(page)}
              className={`flex items-center justify-center px-12 h-10 leading-tight ${currentPage === page ? 'text-blue-600 border-blue-300 bg-blue-50' : 'text-gray-500 bg-white border-gray-300'} hover:bg-gray-100 hover:text-gray-700`}
            >
              {page}
            </a>
          </li>
        ))}
        {currentPage < totalPages && (
          <li>
            <a
              href="#"
              onClick={() => onPageChange(currentPage + 1)}
              className="flex items-center justify-center px-12 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            >
              <span className="sr-only">Next</span>
              {/* SVG for next */}
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default function MainContent() {

  const { register, handleSubmit: handleSubmit, reset, errors } = useTweetForm();

  return (
    <div className="border-x border-x-0.5 border-gray-100 bg-gray-900">
      <div className="h-screen w-full flex flex-col justify-between">
        <div>
          {/* おすすめ、フォロー中 セクション */}
          <div className="text-white flex justify-around w-full border-b border-gray-700 mt-4">
            <div className="hover:bg-gray-900 hover:text-white">
              <h1 className="text-xl font-bold">おすすめ</h1>
              <div className="bg-blue-500 h-1 w-20 rounded-full"></div>
            </div>
            <div className="flex items-center follow">
              <h2 className="text-lg ml-4">フォロー中</h2>
            </div>
          </div>
          {/* TweetForm コンポーネントを使用 */}
          {/* ツイート表示部分 */}
          <div className="flex w-full max-w-2xl border-b border-gray-700 p-4 flex-col items-start">
            <form className="w-full">
              <div className="flex space-x-3 mb-4 items-center">
                <IconContext.Provider value={{ color: '#ccc', size: '55px' }}>
                  <IoPersonCircleOutline />
                </IconContext.Provider> 
                <textarea
                  placeholder="いまどうしてる？"
                  className="bg-transparent flex-1 outline-none placeholder-gray-500 text-base resize-none"
                  {...register('content')} 
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  id="submit-button"
                  //className={`bg-blue-500 text-white rounded-full px-4 py-2 text-base transition-opacity duration-300 ${isTweetButtonDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                  className={`bg-blue-500 text-white rounded-full px-4 py-2 text-base transition-opacity duration-300 'hover:bg-blue-600'}`}
                  // disabled={isTweetButtonDisabled}
                  onClick={handleSubmit}
                >
                ツイートする
                </button>
              </div>
            </form>
          </div>    
        </div>
      </div>
    </div>
  );
};
