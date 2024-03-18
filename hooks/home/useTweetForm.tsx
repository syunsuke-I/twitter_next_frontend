import { useForm } from "react-hook-form";
import { ChangeEvent, useEffect, useState } from "react";

import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { formDataAxiosInstance } from "../../app/common/api";
import {TweetForm} from "../../types/home/home";

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
      await tweet(data.content,selectedFile);
    } catch (error) {
      toast({ variant: "destructive", title: "予期せぬエラーが発生しました" });
    }
  };

  const [content, setContent] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const tweet = async (content : string, file : File | null | undefined) => {

    const formData = new FormData();
    formData.append("content", content);
    if (file) {
      formData.append("file", file);
      console.info(file.name)
    }
    await formDataAxiosInstance.post(
      'tweet',
      formData
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


  const [isTweetButtonDisabled, setIsTweetButtonDisabled] = useState(false);

  useEffect(() => {
    setIsTweetButtonDisabled(content.trim().length === 0);
  }, [content]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>{
    setContent(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      const newFileUrls = Array.from(files).map(file => URL.createObjectURL(file));
      // 新たに選択されたファイルのURLを既存のリストに追加し、最初の4要素のみを保持する
      setImageUrls(prevFiles => [...prevFiles, ...newFileUrls].slice(0, 4));
    } else {
      setSelectedFile(null);
    }
  };

  return { register, handleSubmit: handleSubmit(onSubmit),handleChange,isTweetButtonDisabled,handleFileChange,imageUrls,setImageUrls};
}

export default useTweetForm;