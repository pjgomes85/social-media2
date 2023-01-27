import Layout from "@/components/Layout"
import PostCard from "@/components/PostCard"
import PostForm from "@/components/PostForm"
import { useSession } from "@supabase/auth-helpers-react"
import Login from "./login";
// import { Inter } from '@next/font/google'


export default function Home() {
  const session = useSession();

  if (!session) {
    return <Login />
  }

  return (
    <Layout>
      <PostForm />
      <PostCard />
    </Layout>
  )
}
