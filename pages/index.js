import Layout from "@/components/Layout"
import PostCard from "@/components/PostCard"
import PostForm from "@/components/PostForm"
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react"
import { useEffect, useState } from "react";
import Login from "./login";

// import { Inter } from '@next/font/google'


export default function Home() {
  const supabase = useSupabaseClient();
  const [posts,setPosts] = useState([]);
  const session = useSession();

  useEffect(() => {
    supabase.from('posts').select()
    .then(result => {
      setPosts(result.data)
    })
  }, [])

  if (!session) {
    return <Login />
  }

  return (
    <Layout>
      <PostForm />
      {posts.map(post => (
        // eslint-disable-next-line react/jsx-key
        <PostCard {...post}/>
      ))}
    </Layout>
  )
}
