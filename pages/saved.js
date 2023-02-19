import Layout from "@/components/Layout";
import PostCard from "@/components/PostCard";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

export default function SavedPosts() {
  const [posts, setPosts] = useState([]);
  const session = useSession();
  const supabase = useSupabaseClient();

  useEffect(() => {
    if (!session?.user?.id) {
      return;
    }
    supabase.from('save_posts')
    .select('*, profiles(*)')
    .eq('user_id', session.user.id)
    .then(result => setPosts(result.data))
  }, []);

  return (
    <Layout>
      <h1 className="text-6xl mb-4 text-gray-400">Saved Posts</h1>
      {posts?.length > 0 && posts.map(post => (
        <div key={post.id}>
          <PostCard {...post}/>
        </div>
      ))}
    </Layout>
  )
}
