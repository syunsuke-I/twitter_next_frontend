"use client";

import Image from "next/image";
import SignUpForm from "@/components/top/signup/SignUpForm";
import LoginForm from "@/components/top/login/LoginForm";
import { Toaster } from "@/components/ui/toaster";
import { ErrorToaster } from "@/components/common/ErrorToaster";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

export default function Top() {

  const [isSignUpFormModalOpen, setIsSignUpFormModalOpen] = useState(false);
  const [isLoginFormModalOpen, setIsLoginFormModalOpen] = useState(false);
  const openSignUpFormModal = () => setIsSignUpFormModalOpen(true);
  const openLoginFormModal = () => setIsLoginFormModalOpen(true);
  const [alertShown, setAlertShown] = useState(false);

  const searchParams = useSearchParams();
  const query = searchParams.get("redirected");
  const { toast } = useToast();
  useEffect(() => {
    if (query && !alertShown) {
      toast({ variant: "default", title: "ログインして下さい" });
      setAlertShown(true);
    }
  },[alertShown, query, toast]);
  return (
    <body className="bg-black text-white">
      <Toaster />
      <ErrorToaster />
      <div className="flex items-center justify-center min-h-screen">
          <div className="mb-8">
            <Image 
              src="/static/img/logo-black.png"
              width={500}
              height={500}
              alt="x's logo-black"
            /> 
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-6">すべての話題が、ここに。</h1>
            <p className="mb-6">今すぐ参加しましょう。</p>
            <div className="w-64">
              <div className="space-y-4">
                <a onClick={openSignUpFormModal} className="block bg-blue-500 w-full text-center px-6 py-2 rounded-full shadow-md hover:bg-white hover:text-blue-500 focus:outline-none">アカウントを作成</a>
              </div>
              <div className="mt-9">
                <a onClick={openLoginFormModal}  className="block text-blue-500 w-full text-center border border-blue-500 px-6 py-2 rounded-full shadow-md hover:bg-blue-500 hover:text-white focus:outline-none">ログイン</a>
              </div>
            </div>
          </div>
      </div>
      {isSignUpFormModalOpen && 
        <SignUpForm 
          isSignUpFormModalOpen={isSignUpFormModalOpen}
          setIsSignUpFormModalOpen={setIsSignUpFormModalOpen}
        />
      }
      {isLoginFormModalOpen && 
        <LoginForm 
          isLoginFormModalOpen={isLoginFormModalOpen}
          setIsLoginFormModalOpen={setIsLoginFormModalOpen}
        />
      }      
    </body>
  );
}
