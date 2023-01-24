import PostCard from "./PostCard";
import PostForm from "./PostForm";
import Sidebar from "./Sidebar";

export default function Layout({children}) {
  return (
    <div className='flex mt-4 max-w-4xl mx-auto gap-6'>
      <div className='w-3/12'>
        <Sidebar/>
      </div>
      <div className='w-9/12'>
        {children}
      </div>
    </div>
  )
}
