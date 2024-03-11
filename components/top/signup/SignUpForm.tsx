import { useForm } from "react-hook-form";
import { instance } from "../../../app/common/api";

import {Input} from "@/components/ui/input";
import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {SignUpForm} from "../../../types/top/SignUp";
import { useRouter } from "next/router";
interface Props {
  isSignUpFormModalOpen : boolean
  setIsSignUpFormModalOpen : React.Dispatch<React.SetStateAction<boolean>>;
}

// バリデーションスキーマの定義
const signUpFormSchema = z.object({
  email: z.string()
    .email({ message: "無効なメールアドレスです" })
    .min(1,{ message: "メールアドレスは必須です。" }),
  password: z.string()
    .min(8, { message: "パスワードは8文字以上である必要があります" })
    .max(20, { message: "パスワードは20文字以下である必要があります" })
    .regex(/[a-z]/, "パスワードには少なくとも1つの小文字が必要です。")
    .regex(/[A-Z]/, "パスワードには少なくとも1つの大文字が必要です。")
    .regex(/[0-9]/, "パスワードには少なくとも1つの数字が必要です。")
    .regex(
      /[!?\\-_]/,
      "パスワードには少なくとも1つの特殊文字(!?-_ )が必要です。"
    ),
});

// TypeScriptの型をZodスキーマから抽出
type SignUpFormType = z.infer<typeof signUpFormSchema>;

const SignUpForm = ({ isSignUpFormModalOpen,setIsSignUpFormModalOpen } : Props) => {

  const closeSignUpFormModal = () => setIsSignUpFormModalOpen(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<SignUpFormType>({
    resolver: zodResolver(signUpFormSchema),
  });
  const { toast } = useToast();

  const onSubmit = async (data: SignUpForm) => {
  
    try {
      await signUp(data.email, data.password);
    } catch (error) {
      toast({ variant: "destructive", title: "予期せぬエラーが発生しました" });
    }
  };

  const signUp = async (email : string  , password : string) => {
    await instance.post(
      'signup',
      { email, password }
    ).then(res =>{
      toast({ variant: "default", title: res.data.message });
      setIsSignUpFormModalOpen(!isSignUpFormModalOpen);
      reset();
    }
    ).catch(error => {
      if (error.response && error.response.status === 400) {
        // バックエンドからのバリデーションエラーメッセージを表示
        toast({ variant: "destructive", title: error.response.data.details});
      } else {
        toast({ variant: "destructive", title: "予期せぬエラーが発生しました" });
      }
    });
    return;
  };
  

  return (
    <div className={` ${isSignUpFormModalOpen ? 'fixed inset-0 bg-gray-600 bg-opacity-50 z-10 flex items-center justify-center overflow-y-auto overflow-x-hidden top-0 right-0 left-0 w-full md:inset-0 h-[calc(100%-1rem)] max-h-full'  : 'flex items-center justify-center min-h-screen'}`}>
      <Card className="max-w-sm w-full bg-gray-800 shadow-xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="text-xl font-semibold text-white">アカウントを作成</div>
            <div onClick={closeSignUpFormModal} className="text-white">✖️</div>
          </div>
          <form onSubmit={handleSubmit((onSubmit))}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-300 text-sm font-bold mb-2">メールアドレス</label>
              <Input id="email" type="email" defaultValue="" {...register('email')} placeholder="email@example.com" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              {errors.email && <p className="error text-gray-200 text-sm pt-2">{errors.email.message}</p>} {/* Emailエラーメッセージ */}
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-300 text-sm font-bold mb-2">パスワード</label>
              <Input id="password" type="password" {...register('password')} defaultValue="" placeholder="******************" className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
              {errors.password && <p className="error text-gray-200 text-sm pt-1">{errors.password.message}</p>} {/* Passwordエラーメッセージ */}
            </div>
            <div className="flex items-center justify-between">
              <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">登録</Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default SignUpForm;
