import Layout from "@/components/Layout"
import PostCard from "@/components/PostCard"
import PostForm from "@/components/PostForm"
// import { Inter } from '@next/font/google'


export default function Home() {
  return (
    <Layout>
      <PostForm />
      <PostCard />
    </Layout>
  )
}
