import { UserContext } from "@/components/context/UserContext";
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
  const [profile,setProfile] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);


  useEffect(() => {
    if (!session?.user?.id) {
      return;
    }
    supabase.from('profiles')
    .select()
    .eq('id', session.user.id)
    .then(result => {
      if (result.data.length) {
        setProfile(result.data[0]);
      }
    })
  }, [session?.user?.id]);

  function fetchPosts() {
    supabase.from('posts')
    .select('id, content, created_at, photos, profiles(id, avatar, name)')
    .order('created_at', {ascending: false})
    .then(result => {
      setPosts(result.data)
    });
  }

  if (!session) {
    return <Login />
  };

  return (
    <Layout>
      <UserContext.Provider value={{profile}} >
        <PostForm onPost={fetchPosts} />
        {posts?.length > 0 && posts.map(post => (
          // eslint-disable-next-line react/jsx-key
          <PostCard key={post.created_at} {...post} />
        ))}
      </UserContext.Provider>
    </Layout>
  )
}
