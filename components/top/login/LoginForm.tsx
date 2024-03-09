import {Input} from "@/components/ui/input";
import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";

interface Props {
  isSignUpFormModalOpen : boolean
  setIsSignUpFormModalOpen : React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginForm = ({ isSignUpFormModalOpen,setIsSignUpFormModalOpen } : Props) => {

  const closeSignUpFormModal = () => setIsSignUpFormModalOpen(false);

  return (
    <div className={` ${isSignUpFormModalOpen ? 'fixed inset-0 bg-gray-600 bg-opacity-50 z-10 flex items-center justify-center overflow-y-auto overflow-x-hidden top-0 right-0 left-0 w-full md:inset-0 h-[calc(100%-1rem)] max-h-full'  : 'flex items-center justify-center min-h-screen'}`}>
      <Card className="max-w-sm w-full bg-gray-800 shadow-xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="text-xl font-semibold text-white">Xにログイン</div>
            <div onClick={closeSignUpFormModal} className="text-white">✖️</div>
          </div>
          <form action="/login" method="POST">
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-300 text-sm font-bold mb-2">メールアドレス</label>
              <Input id="email" name="email" type="email" defaultValue="" placeholder="email@example.com" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-300 text-sm font-bold mb-2">パスワード</label>
              <Input id="password" name="password" type="password" defaultValue="" placeholder="******************" className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="flex items-center justify-between">
              <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">ログイン</Button>
              <Link href="/signup" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">アカウントを持っていない場合は登録</Link>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default LoginForm;
