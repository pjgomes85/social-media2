import Layout from "@/components/Layout"
import PostCard from "@/components/PostCard"
import PostForm from "@/components/PostForm"
import { useSession } from "@supabase/auth-helpers-react"
// import { Inter } from '@next/font/google'


export default function Home() {
  const session = useSession();

  console.log(session);
  if (!session) {
    console.log('no session');
  }

  return (
    <Layout>
      <PostForm />
      <PostCard />
    </Layout>
  )
}
