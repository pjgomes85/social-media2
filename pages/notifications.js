import Avatar from "@/components/Avatar";
import Card from "@/components/Card";
import Layout from "@/components/Layout";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotificationsPage({id,content,created_at,photos,profiles:authorProfile}) {
  const [likes, setLikes] = useState([]);
  const supabase = useSupabaseClient();

useEffect(() => {
fetchLikes()

}, []);




function fetchLikes() {
  supabase.from('likes')
  .select()
  .eq('post_id', id)
  .then(result =>
    setLikes(result.data)
  )
}





  return (
    <Layout>
      <h1 className="text-6xl mb-4 text-gray-400">Notifications</h1>
      <Card noPadding={true}>
        <div className="">
          <div className="flex gap-2 items-center border-b border-b-gray-100 p-4">
            <Link href={'/profile'}>
              <Avatar />
            </Link>
            <div>
              {likes?.length}
              <Link href={'/profile'} className="font-semibold mr-1 hover:underline">Paulo Gomes</Link>
               liked
              <Link href="/profile/photos" className={"ml-1 text-socialBlue"}> your foto</Link>
            </div>
          </div>
          <div className="flex gap-2 items-center border-b border-b-gray-100 p-4">
            <Link href={'/profile'}>
              <Avatar />
            </Link>
            <div>
              <Link href={'/profile'} className="font-semibold mr-1 hover:underline">Paulo Gomes</Link>
               liked
              <Link href="/profile/photos" className={"ml-1 text-socialBlue"}> your foto</Link>
            </div>
          </div>
          <div className="flex gap-2 items-center border-b border-b-gray-100 p-4">
            <Link href={'/profile'}>
              <Avatar />
            </Link>
            <div>
              <Link href={'/profile'} className="font-semibold mr-1 hover:underline">Paulo Gomes</Link>
               liked
              <Link href="/profile/photos" className={"ml-1 text-socialBlue"}> your foto</Link>
            </div>
          </div>
        </div>

      </Card>
    </Layout>
  )

}
