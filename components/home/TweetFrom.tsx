import { useForm } from "react-hook-form";
import { instance } from "../../app/common/api";

import {Card} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";

import { zodResolver } from "@hookform/resolvers/zod";

import {TweetForm} from "../../types/home/home";

interface Props {
  isTweetFormModalOpen : boolean
  setIsTweetFormModalOpen : React.Dispatch<React.SetStateAction<boolean>>;
}

 const TweetFrom = ({ isTweetFormModalOpen,setIsTweetFormModalOpen } : Props) => {

  const tweetFormSchema = z.object({
    contents: z.string()
      .email({ message: "無効なメールアドレスです" })
      .min(1,{ message: "メールアドレスは必須です。" }),
  });

  type SignUpFormType = z.infer<typeof tweetFormSchema>;

  const openTweetFormModal = () => setIsTweetFormModalOpen(!isTweetFormModalOpen);

  const { toast } = useToast();

  const signUp = async (contents : string) => {
    await instance.post(
      'signup',
      { contents}
    ).then(res =>{
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

  const { register, handleSubmit, reset, formState: { errors } } = useForm<SignUpFormType>({
    resolver: zodResolver(tweetFormSchema),
  });


  const onSubmit = async (data: TweetForm) => {
    try {
      await signUp(data.contents);
    } catch (error) {
      toast({ variant: "destructive", title: "予期せぬエラーが発生しました" });
    }
  };

  return(
    <div className={` ${isTweetFormModalOpen ? 'fixed inset-0 bg-gray-600 bg-opacity-50 z-10 flex items-center justify-center overflow-y-auto overflow-x-hidden top-0 right-0 left-0 w-full md:inset-0 h-[calc(100%-1rem)] max-h-full'  : 'flex items-center justify-center min-h-screen'}`}>
      <Card className="max-w-sm w-full bg-gray-800 shadow-xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div onClick={openTweetFormModal} className="text-white">✖️</div>
          </div>
          <form onSubmit={handleSubmit((onSubmit))}>
            <div className="flex items-center justify-between">
              <Input ></Input>
              <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">ポストする</Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default TweetFrom;