import { useForm } from "react-hook-form";
import { instance } from "../../app/common/api";

import { Toaster } from "@/components/ui/toaster";
import { ErrorToaster } from "@/components/common/ErrorToaster";

import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";

import { zodResolver } from "@hookform/resolvers/zod";

import {TweetForm} from "../../types/home/home";

import { IconContext } from 'react-icons'
import { IoPersonCircleOutline } from "react-icons/io5";

import { cookies } from 'next/headers'

interface Props {
  isTweetFormModalOpen : boolean
  setIsTweetFormModalOpen : React.Dispatch<React.SetStateAction<boolean>>;
}

 const TweetFrom = ({ isTweetFormModalOpen,setIsTweetFormModalOpen } : Props) => {

  const tweetFormSchema = z.object({
    content: z.string()
      .min(1,{ message: "投稿内容は必須です。" }),
  });

  type TweetFormType = z.infer<typeof tweetFormSchema>;

  const openTweetFormModal = () => setIsTweetFormModalOpen(!isTweetFormModalOpen);

  const { toast } = useToast();

  const tweet = async (content : string) => {
    await instance.post(
      'tweet',
      {content}
    ).then(res =>{
      toast({ variant: "default", title: res.data.message });
      setIsTweetFormModalOpen(!isTweetFormModalOpen);
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

  const { register, handleSubmit, reset, formState: { errors } } = useForm<TweetFormType>({
    resolver: zodResolver(tweetFormSchema),
  });


  const onSubmit = async (data: TweetForm) => {
    try {
      await tweet(data.content);
    } catch (error) {
      toast({ variant: "destructive", title: "予期せぬエラーが発生しました" });
    }
  };

  return(
    <div className={`${isTweetFormModalOpen ? 'fixed inset-0 bg-gray-600 bg-opacity-50 z-10 flex items-center justify-center overflow-y-auto overflow-x-hidden top-0 right-0 left-0 w-full md:inset-0 h-[calc(100%-1rem)] max-h-full' : 'flex items-center justify-center min-h-screen'}`}>
      <Card className="max-w-screen-sm w-full bg-gray-900 shadow-xl border-none" style={{ transform: 'translateX(-45px) translateY(-150px)'}}>
      <Toaster />
      <ErrorToaster />
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div onClick={openTweetFormModal} className="text-white cursor-pointer">✖️</div>
          </div>
          <div className="flex">
            <IconContext.Provider value={{ color: '#ccc', size: '35px', className: 'self-center mb-auto' }}>
              <IoPersonCircleOutline />
            </IconContext.Provider>
            <form onClick={handleSubmit(onSubmit)} className="w-full flex flex-col items-end">
              <textarea {...register('content')}  className="border-none bg-gray-900 text-white w-full h-44 bg-transparent outline-none placeholder mb-3" placeholder="いまどうしてる？"></textarea>
              <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">ポストする</Button>
            </form>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TweetFrom;