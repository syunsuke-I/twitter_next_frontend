import React from 'react';

const SidebarRight = () => {
  return (
    <div className="h-screen">
      <div className="ml-12">
        {/* 検索欄 */}
        <div className="flex items-center rounded-full bg-gray-700 p-2 w-full max-w-sm mt-4">
          <i className="bi bi-search mr-2 text-xl"></i>
          <input className="bg-transparent outline-none placeholder-gray-400 text-white pl-4 pr-3 py-1 w-full" type="search" placeholder="検索" />
        </div>
        {/* サブスクへの案内 */}
        <div className="text-white rounded-lg p-4 max-w-sm mt-5"> 
          <p className="text-2xl font-bold">
            プレミアムにサブスクライブ
          </p>
          <p className="text-sm mt-2">
            サブスクライブして新機能を利用しましょう。
            購読を続けている場合、広告収益配分を受け取れます。
          </p>
          <button className="bg-blue-500 rounded-full hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4">
            購入する
          </button>
        </div>
        {/* いまどうしてる？*/}
        <div className="rounded-lg p-4 mt-2 my-2 max-w-sm">
          <p className="text-2xl font-bold">
            いまどうしてる？
          </p>
          <div className="divide-y divide-gray-700">
            {/* アイテム */}
            <div className="py-3 hover:bg-gray-700">
              <div className="text-sm font-semibold text-blue-500">Go・トレンド</div>
              <div className="text-xs text-gray-400">Goについて</div>
              <div className="text-sm text-white mt-1">トレンドビッグ：New versions of Golang are released.</div>
            </div>
          </div>
          <div className="divide-y divide-gray-700">
            {/* アイテム */}
            <div className="py-3 hover:bg-gray-700">
              <div className="text-sm font-semibold text-blue-500">Rails・トレンド</div>
              <div className="text-xs text-gray-400">Railsについて</div>
              <div className="text-sm text-white mt-1">トレンドビッグ：New versions of Rails are released.</div>
            </div>
          </div>
          {/* さらに表示ボタン */}
          <button className="w-full text-blue-500 text-sm font-semibold mt-4 py-2 hover:bg-gray-700 rounded">
            さらに表示
          </button>
        </div>
        {/* おすすめユーザ */}
        <div className="rounded-lg p-4 mt-2 max-w-sm">
          <p className="text-2xl font-bold">
            おすすめユーザ
          </p>
          <div className="divide-y divide-gray-700">
            {/* アイテム */}
            <div className="flex p-4 border-b border-gray-700">
              <i className="bi bi-person-circle text-3xl"></i>
              <div className="ml-4 flex flex-col">
                <span className="font-bold text-white">test_user3</span>
                <span className="text-gray-500">@test_user3</span>
              </div>
              <button className="bg-white text-black rounded-full font-bold px-6 text-sm ml-auto">フォロー</button>
            </div>
            <div className="flex p-4 border-b border-gray-700">
              <i className="bi bi-person-circle text-3xl"></i>
              <div className="ml-4 flex flex-col">
                <span className="font-bold text-white">test_user4</span>
                <span className="text-gray-500">@test_user4</span>
              </div>
              <button className="bg-white text-black rounded-full font-bold px-6 text-sm ml-auto">フォロー</button>
            </div>
          </div>
          {/* さらに表示ボタン */}
          <button className="w-full text-blue-500 text-sm font-semibold mt-4 py-2 hover:bg-gray-700 rounded">
            さらに表示
          </button>
        </div>
      </div>
    </div>
  );
}

export default SidebarRight;
