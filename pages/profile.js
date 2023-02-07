import Avatar from "@/components/Avatar";
import Card from "@/components/Card";
import Layout from "@/components/Layout";
import Link from "next/link";
import PostCard from "@/components/PostCard";
import { useRouter } from "next/router";
import FriendInfo from "@/components/FriendInfo";
import { useEffect,useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Cover from "@/components/Cover";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  console.log(profile)
  const router = useRouter();
  const session = useSession();
  const supabase = useSupabaseClient();

  const userId = router.query.id;

  useEffect(() => {
    if (!userId) {
      return;
    }
    fetchUser()
  }, [userId]);

  function fetchUser() {
    supabase.from('profiles').select().eq('id', userId).then(result => {
      if (result.error) {
        throw result.error;
      }
      if (result.data) {
        setProfile(result.data[0])
      }
    })
  }


  const {asPath:pathname} = router;
  const isPosts = pathname.includes('posts') || pathname === '/profile';
  const isAbout = pathname.includes('about');
  const isFriends = pathname.includes('friends');
  const isPhotos = pathname.includes('photos');
  const tabClasses = 'p-3 flex gap-1 px-4 py-1 border-b-4 border-b-white items-center';
  const activeTabClasses = "p-3 flex gap-1 px-4 py-1 items-center border-socialBlue border-b-4 text-socialBlue font-bold";

  const isMyUSer = userId === session?.user?.id;

  return (

    <Layout>
      <Card noPadding={true}>
        <div className="relative overflow-hidden rounded-md">
          <Cover url={profile?.cover} editable={isMyUSer} onChange={fetchUser} />
          <div className="absolute top-24 left-4 z-20">
            {profile && (
              <Avatar url={profile.avatar} size={'lg'} editable={isMyUSer} onChange={fetchUser}/>
            )}
          </div>
          <div className="p-4 pt-0 md:pt-4 pb-0">
            <div className="ml-24 md:ml-40">
              <h1 className="text-2xl font-bold">
                {profile?.name}
              </h1>
              <div className="text-gray-500 leading-4">{profile?.place}</div>
            </div>
            <div className="mt-4 md:mt-10 flex gap-1">
            <Link href={'/profile/posts'} className={isPosts ? activeTabClasses : tabClasses}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
                <span className="hidden sm:block">Posts</span>
              </Link>
              <Link href={'/profile/about'} className={isAbout ? activeTabClasses : tabClasses}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg>
                <span className="hidden sm:block">About</span>
              </Link>
              <Link href={'/profile/friends'} className={isFriends ? activeTabClasses : tabClasses}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
                <span className="hidden sm:block">Friends</span>
              </Link>
              <Link href={'/profile/photos'} className={isPhotos ? activeTabClasses : tabClasses}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <span className="hidden sm:block">Photos</span>
              </Link>
            </div>
          </div>
        </div>
      </Card>
     {isPosts && (
      <div>
        <PostCard />
      </div>
     )}
     {isAbout && (
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
     {isFriends && (
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
     {isPhotos && (
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
    </Layout>

  );
}
