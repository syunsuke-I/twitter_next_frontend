import Image from "next/image";

export default function SidebarLeft() {

  return(
    <div className="bg-customGray h-screen w-64 flex flex-col">
    {/* <!-- ロゴやタイトルエリア --> */}
    <div className="text-white text-xl font-bold p-4">
      <Image 
        src="/static/img/logo-white.png"
        width={500}
        height={500}
        alt="x's logo-black"
        className="w-12 h-12 rounded-full"
      />
    </div>
    {/* <!-- メニューアイテムエリア --> */}
    <div className="flex-grow flex flex-col text-gray-300 mt-4">
      <a href="#" className="flex items-center px-6 py-4 hover:bg-gray-700 hover:text-white text-xl my-2">
        <i className="bi bi-house-door mr-3 text-3xl"></i>
        ホーム
      </a>
      <a href="#" className="flex items-center px-6 py-4 hover:bg-gray-700 hover:text-white text-xl my-2">
        <i className="bi bi-search mr-3 text-3xl"></i>
        話題を検索
      </a>
      <a href="#" className="flex items-center px-6 py-4 hover:bg-gray-700 hover:text-white text-xl my-2">
        <i className="bi bi-bell mr-3 text-3xl"></i>
        通知
      </a>
    </div>

    {/* <!-- プロフィールエリア --> */}
    <div className="mt-auto text-gray-300 p-4 hover:bg-gray-700 hover:text-white">
      <div className="bg-gray-800 p-4 rounded-full flex items-center space-x-3">
        <i className="bi bi-person-circle text-3xl"></i>
        <div className="flex flex-col">
          <span className="text-white font-bold">@UserName</span>
          <span className="text-gray-400">@UserId</span>
        </div>
        <div className="ml-auto">
          <button className="text-gray-400 hover:text-white">•••</button>
        </div>
      </div>
    </div>
  </div>

  );
};