import Card from "../components/Card"
import Sidebar from "@/components/Sidebar"
// import { Inter } from '@next/font/google'


export default function Home() {
  return (
    <div className='flex mt-4 max-w-34xl mx-auto gap-6'>
      <div className='w-1/3'>
        <Sidebar/>
      </div>
      <div className='grow'>
        <Card>form here</Card>
        <Card>first post</Card>
      </div>
    </div>
  )
}
