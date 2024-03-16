import { ErrorToaster } from "@/components/common/ErrorToaster";
import { AiOutlinePicture } from "react-icons/ai";

import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";

import useTweetForm from "../../hooks/home/useTweetForm";

import { IconContext } from 'react-icons'
import { IoPersonCircleOutline } from "react-icons/io5";

interface Props {
  isTweetFormModalOpen : boolean
  setIsTweetFormModalOpen : React.Dispatch<React.SetStateAction<boolean>>;
}

 const TweetFrom = ({ isTweetFormModalOpen,setIsTweetFormModalOpen} : Props) => {

  const openTweetFormModal = () => setIsTweetFormModalOpen(!isTweetFormModalOpen);
  const { register, handleSubmit,handleChange,isTweetButtonDisabled } = useTweetForm({isTweetFormModalOpen,setIsTweetFormModalOpen});
  
  return(
    <div className={`${isTweetFormModalOpen ? 'fixed inset-0 bg-gray-600 bg-opacity-50 z-10 flex items-center justify-center overflow-y-auto overflow-x-hidden top-0 right-0 left-0 w-full md:inset-0 h-[calc(100%-1rem)] max-h-full' : 'flex items-center justify-center min-h-screen'}`}>
      <Card className="max-w-screen-sm w-full bg-gray-900 shadow-xl border-none" style={{ transform: 'translateX(-45px) translateY(-150px)'}}>
      <ErrorToaster />
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div onClick={openTweetFormModal} className="text-white cursor-pointer">✖️</div>
          </div>
          <div className="flex">
            <IconContext.Provider value={{ color: '#ccc', size: '35px', className: 'self-center mb-auto' }}>
              <IoPersonCircleOutline />
            </IconContext.Provider>
            <form className="w-full flex flex-col">
              <textarea 
                className="border-none bg-gray-900 text-white w-full h-44 bg-transparent outline-none placeholder mb-3 resize-none" 
                placeholder="いまどうしてる？"
                {...register('content')}
                onChange={handleChange}
              >
              </textarea>
                <div className="flex justify-between items-center mt-4">
                  <IconContext.Provider value={{ color: '#ccc', size: '30px', className: 'cursor-pointer' }}>
                    <AiOutlinePicture />
                  </IconContext.Provider>
                  <Button 
                    onClick={handleSubmit} 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                    type="submit"
                    disabled={isTweetButtonDisabled}  
                  >ポストする
                  </Button>
                </div>
            </form>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TweetFrom;