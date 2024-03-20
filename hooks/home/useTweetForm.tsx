import { useForm } from "react-hook-form";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = async (data: TweetForm) => {
    try {
      await tweet(data.content,selectedFiles);
    } catch (error) {
      toast({ variant: "destructive", title: "予期せぬエラーが発生しました" });
    }
  };

  const [content, setContent] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const clearFilesAndUrls = () => {
    setSelectedFiles([]);
    setImageUrls([]);
  };

  const tweet = async (content: string, files: File[]) => {

    const formData = new FormData();
    formData.append("content", content);

    files.forEach((file, index) => {
      formData.append(`images[${index}]`, file);
    });

    await formDataAxiosInstance.post(
      'tweet',
      formData
    ).then(res =>{
      clearFilesAndUrls();
      toast({ variant: "default", title: res.data.message });
      reset();
      setIsTweetFormModalOpen(!isTweetFormModalOpen);
    }
    ).catch(error => {
      if (error.response && error.response.status === 400) {
        toast({ variant: "destructive", title: error.response.data.error });
        if(error.response.data.error == "セッションが有効ではありません")
        router.push('/');
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
    if (files) {
      const newSelectedFiles = Array.from(files);
      const newFileUrls = newSelectedFiles.map(file => URL.createObjectURL(file)); 
      // 既存のファイルと新たに選択されたファイルを結合する
      setSelectedFiles(prevFiles => [...prevFiles, ...newSelectedFiles]);
      setImageUrls(prevUrls => [...prevUrls, ...newFileUrls].slice(0, 4));
    } else {
      setSelectedFiles([]);
      setImageUrls([]);
    }
  };

  return { register, handleSubmit: handleSubmit(onSubmit),handleChange,isTweetButtonDisabled,handleFileChange,imageUrls,setImageUrls,toast};
}

export default useTweetForm;