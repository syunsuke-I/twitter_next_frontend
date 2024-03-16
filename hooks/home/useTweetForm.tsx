import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { instance } from "../../app/common/api";
import {TweetForm} from "../../types/home/home";

import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";

const tweetFormSchema = z.object({
  content: z.string()
    .min(1,{ message: "投稿内容は必須です。" }),
});

type TweetFormType = z.infer<typeof tweetFormSchema>;

interface Props {
  isTweetFormModalOpen? : boolean;
  setIsTweetFormModalOpen? : React.Dispatch<React.SetStateAction<boolean>>;
}

const useTweetForm = ({isTweetFormModalOpen = false, setIsTweetFormModalOpen = () => {} }: Props = {}) => {

  const { register, handleSubmit, reset, formState: { errors } } = useForm<TweetFormType>({
    resolver: zodResolver(tweetFormSchema),
  });

  const { toast } = useToast();

  const onSubmit = async (data: TweetForm) => {
    try {
      await tweet(data.content);
    } catch (error) {
      toast({ variant: "destructive", title: "予期せぬエラーが発生しました" });
    }
  };

  const tweet = async (content : string) => {
    await instance.post(
      'tweet',
      {content} 
    ).then(res =>{
      toast({ variant: "default", title: res.data.message });
      reset();
      setIsTweetFormModalOpen(!isTweetFormModalOpen);
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

  const [content, setContent] = useState('');
  const [isTweetButtonDisabled, setIsTweetButtonDisabled] = useState(false);

  useEffect(() => {
    setIsTweetButtonDisabled(content.trim().length === 0);
  }, [content]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>{
    setContent(e.target.value);
  };

  return { register, handleSubmit: handleSubmit(onSubmit),handleChange,isTweetButtonDisabled,};
}

export default useTweetForm;