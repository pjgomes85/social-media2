import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import Card from "./Card";
import FriendInfo from "./FriendInfo";
import PostCard from "./PostCard";

export default function ProfileContent({activeTab,userId}) {
  const [posts,setPosts] = useState([]);
  const [profile, setProfile] = useState(null);
  const supabase = useSupabaseClient();

  useEffect(async () => {
    if (!userId) {
      return;
    }
    if (activeTab === 'posts') {
      loadPosts().then(() => {})
    }
  }, [userId]);

  async function loadPosts() {
    const posts = await userPosts(userId);
    const profile = await userProfile(userId);
    setPosts(posts);
    setProfile(profile)
  }

  async function userPosts(userId) {
    const {data} = await supabase.from('posts').select('id, content, created_at, author)')
    .eq('author', userId);
    return data;
  }

  async function userProfile(userId) {
    const {data} = await supabase.from('profiles').select()
    .eq('author', userId);
    return data[0];
  }

  return (
    <div>
      {activeTab === 'posts' && (
      <div>
        postsgggg
        {/* <PostCard /> */}
      </div>
     )}
     {activeTab === 'about' && (
      <div>
        <Card>
          <div>
            <h2 className="text-3xl mb-2">About Me</h2>
            <p className="mb-2 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex doloribus porro sint at pariatur culpa tempora officiis natus numquam soluta cumque dolor aliquid officia accusamus explicabo, nemo quaerat assumenda nam.</p>
            <p className="mb-2 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi laudantium ipsam rem incidunt voluptate accusantium odio suscipit aliquam minima quos commodi optio expedita minus eveniet pariatur, exercitationem impedit dicta voluptates.</p>
          </div>
        </Card>
      </div>
     )}
     {activeTab === 'friends' && (
      <div>
        <Card>
          <h2 className="text-3xl mb-2">Friends</h2>
          <div className="">
            <div className="border-b border-b-gray-100 p-4 -mx-4">
              <FriendInfo />
            </div>
            <div className="border-b border-b-gray-100 p-4 -mx-4">
              <FriendInfo />
            </div>
            <div className="border-b border-b-gray-100 p-4 -mx-4">
              <FriendInfo />
            </div>
            <div className="border-b border-b-gray-100 p-4 -mx-4">
              <FriendInfo />
            </div>
            <div className="border-b border-b-gray-100 p-4 -mx-4">
              <FriendInfo />
            </div>
            <div className="border-b border-b-gray-100 p-4 -mx-4">
              <FriendInfo />
            </div>
            <div className="border-b border-b-gray-100 p-4 -mx-4">
              <FriendInfo />
            </div>
            <div className="border-b border-b-gray-100 p-4 -mx-4">
              <FriendInfo />
            </div>
            <div className="border-b border-b-gray-100 p-4 -mx-4">
              <FriendInfo />
            </div>
          </div>
        </Card>
      </div>
     )}
     {activeTab === 'photos' && (
      <div>
        <Card>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-md overflow-hidden h-48 flex items-center shadow-md">
              <img src="https://images.unsplash.com/photo-1611691934391-5a8805e0bd1a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" className="src" />
            </div>
            <div className="rounded-md overflow-hidden h-48 flex items-center shadow-md">
              <img src="https://images.unsplash.com/photo-1591086857293-497543d75466?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80" alt="" className="src" />
            </div>
            <div className="rounded-md overflow-hidden h-48 flex items-center shadow-md">
              <img src="https://images.unsplash.com/photo-1660661713294-45b957739a30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80" alt="" className="src" />
            </div>
            <div className="rounded-md overflow-hidden h-48 flex items-center shadow-md">
              <img src="https://images.unsplash.com/photo-1606215767711-263080a6b4b9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" className="src" />
            </div>
          </div>
        </Card>
      </div>
     )}
    </div>
  )

}
