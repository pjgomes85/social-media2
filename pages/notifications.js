import Avatar from "@/components/Avatar";
import Card from "@/components/Card";
import Layout from "@/components/Layout";
import PostCard from "@/components/PostCard";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function NotificationsPage({profiles:authorProfile}) {
  const [posts, setPosts] = useState([]);
  const session = useSession();
  const supabase = useSupabaseClient();

  useEffect(() => {
    if (!session?.user?.id) {
      return;
    }
    supabase
      .from('likes')
      .select('post_id')
      .eq('user_id', session.user.id)
      .then(result => {
        const postIds = result.data.map(item => item.post_id);
        supabase
          .from('posts')
          .select('*, profiles(name)')
          .in('id, ', postIds)
          .then(result => setPosts(result.data));
      });
  }, [session?.user?.id]);



// function fetchLikes() {

//   supabase.from('likes','profiles')
//   .select()
//   .then(result =>
//     setLikes(result.data)
//   )

// }
const likedByOtherUser = (post) => {
  const likedByCurrentUser = post.likes?.some(like => like.user_id === session.user.id);
  return !likedByCurrentUser;
}





return (
  <Layout>
    <h1 className="text-6xl mb-4 text-gray-400">Notifications</h1>
    <Card noPadding={true}>
      {posts?.length > 0 && posts.map(post => (
        <div key={post.id} className="">
          {likedByOtherUser(post) && (
            <div className="flex gap-4 items-center border-b border-b-gray-100 p-4">
              <Link href={'/profile'} className="font-semibold mr-1 hover:underline">
                {post?.profiles?.name}
              </Link>
              liked
              <Link href="/profile/photos" className="ml-1 text-socialBlue">
                Your Post
              </Link>
            </div>
          )}
        </div>
      ))}
    </Card>
  </Layout>
);
};


        // <div className="">
        //   <div className="flex gap-2 items-center border-b border-b-gray-100 p-4">
        //     <Link href={'/profile'}>
        //       <Avatar />
        //     </Link>
        //     <div>
        //       <Link href={'/profile'} className="font-semibold mr-1 hover:underline">Paulo Gomes</Link>
        //        liked
        //       <Link href="/profile/photos" className={"ml-1 text-socialBlue"}> your foto</Link>
        //     </div>
        //   </div>
        //   <div className="flex gap-2 items-center border-b border-b-gray-100 p-4">
        //     <Link href={'/profile'}>
        //       <Avatar />
        //     </Link>
        //     <div>
        //       <Link href={'/profile'} className="font-semibold mr-1 hover:underline">Paulo Gomes</Link>
        //        liked
        //       <Link href="/profile/photos" className={"ml-1 text-socialBlue"}> your foto</Link>
        //     </div>
        //   </div>
        //   <div className="flex gap-2 items-center border-b border-b-gray-100 p-4">
        //     <Link href={'/profile'}>
        //       <Avatar />
        //     </Link>
        //     <div>
        //       <Link href={'/profile'} className="font-semibold mr-1 hover:underline">Paulo Gomes</Link>
        //        liked
        //       <Link href="/profile/photos" className={"ml-1 text-socialBlue"}> your foto</Link>
        //     </div>
        //   </div>
        // </div>
