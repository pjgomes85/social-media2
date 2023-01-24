import Card from "../components/Card"
import Sidebar from "@/components/Sidebar"
import PostForm from "@/components/PostForm"
import PostCard from "@/components/PostCard"
// import { Inter } from '@next/font/google'


export default function Home() {
  return (
    <div className='flex mt-4 max-w-4xl mx-auto gap-6'>
      <div className='w-3/12'>
        <Sidebar/>
      </div>
      <div className='w-9/12'>
        <PostForm />
        <PostCard />
      </div>
    </div>
  )
}
