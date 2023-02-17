import Avatar from "./Avatar";
import Card from "./Card";
import ClickOutHandler from 'react-clickout-handler';
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import ReactTimeAgo from "react-time-ago";
import React from 'react';
import { UserContext } from "./contexts/UserContext";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { comment } from "postcss";


export default function PostCard({id,content,created_at,photos,profiles:authorProfile}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const {profile:myProfile} = useContext(UserContext);
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [upload, setUpload] = useState([]);
  const [commentText, setCommentText] = useState('');
  const supabase = useSupabaseClient();

  useEffect(() => {
    fetchLikes()
    fetchComments()
  }, []);

  function fetchComments() {
    supabase.from('posts')
    .select('*, profiles(*)')
    .eq('parent', id)
    .then(result => setComments(result.data))
  }

  function fetchLikes() {
    supabase.from('likes')
    .select()
    .eq('post_id', id)
    .then(result =>
      setLikes(result.data)
    )
  }

  function openDropdown(e) {
    e.stopPropagation();
    setDropdownOpen(true)
  }
  function handleClickOutsideDropdown(e) {
    e.stopPropagation();
    setDropdownOpen(false);
  }

  const isLikedByMe = !!likes.find(like =>
    like.user_id === myProfile?.id
  )

  function toogleLike() {
    if (isLikedByMe) {
      supabase.from('likes').delete()
      .eq('post_id', id)
      .eq('user_id', myProfile.id)
      .then(result => {
        console.log("deleted result", result)
        fetchLikes();
      })
      return;
    }
    supabase.from('likes')
    .insert({
      post_id: id,
      user_id: myProfile.id,
        })
    .then(result => {
      fetchLikes();
    })
  }

  function postComment(ev) {
    ev.preventDefault();
    supabase.from('posts')
    .insert({
      content: commentText,
      author: myProfile?.id,
      parent: id,
    })
    .then(result => {
      fetchComments();
      setCommentText('');
      setUpload([]);
    })
  }

  async function addPhotos(ev) {
    const files = ev.target.files;
    if (files.length > 0) {
      // setIsUploading(true);
      for (const file of files) {
        const newName = Date.now() + file.name;
        const result = await supabase
        .storage
        .from('photos')
        .upload(newName, file);
        if (result.data) {
          const url = process.env.NEXT_PUBLIC_SUPABASE_URL + '/storage/v1/object/public/photos/' + result.data.path
          setUpload(prevUploads => [...prevUploads,url]);
        } else {
          console.log(result)
        }
       }
      //  setIsUploading(false);
    }
  }



  return (
    <Card>
      <div className="flex gap-3">
        <div>
          <Link href={'/profile'}>
            <span className="cursor-pointer">
              <Avatar url={authorProfile?.avatar}  />
            </span>
          </Link>
        </div>
        <div className="grow">
          <p>
            <Link href={'/profile/'+authorProfile.id}>
              <span className="mr-1 font-semibold cursor-pointer hover:underline">
                {authorProfile?.name}
              </span>
            </Link>
             shared a post
          </p>
          <p className="text-gray-500 text-sm">
            <ReactTimeAgo date={(new Date(created_at)).getTime()} />
            </p>
        </div>
        <div>
        {!dropdownOpen && (
            <button className="text-gray-400" onClick={openDropdown}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
          </button>
          )}
          {dropdownOpen && (
            <button className="text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
          </button>
          )}
          <ClickOutHandler onClickOut={handleClickOutsideDropdown}>
            <div className="relative">
              {dropdownOpen && (
                <div className="absolute -right-6 bg-white shadow-md shadow-gray-300 p-3 rounded-sm border border-gray-100 w-52">
                  <a href="" className='flex gap-3 py-2 my-2 hover:bg-socialBlue hover:text-white -mx-4 px-4 rounded-md transition-all hover:scale-110 hover:shadow-md shadow-gray-500'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                    </svg>
                    Save Posts</a>
                  <a href="" className='flex gap-3 py-2 my-2 hover:bg-socialBlue hover:text-white -mx-4 px-4 rounded-md transition-all hover:scale-110 hover:shadow-md shadow-gray-500'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                    </svg>
                    Turn Notifications</a>
                  <a href="" className='flex gap-3 py-2 my-2 hover:bg-socialBlue hover:text-white -mx-4 px-4 rounded-md transition-all hover:scale-110 hover:shadow-md shadow-gray-500'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Hide Posts</a>
                  <a href="" className='flex gap-3 py-2 my-2 hover:bg-socialBlue hover:text-white -mx-4 px-4 rounded-md transition-all hover:scale-110 hover:shadow-md shadow-gray-500'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                    Delete</a>
                    <a href="" className='flex gap-3 py-2 my-2 hover:bg-socialBlue hover:text-white -mx-4 px-4 rounded-md transition-all hover:scale-110 hover:shadow-md shadow-gray-500'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                      </svg>
                      Report</a>
                </div>
              )}
            </div>

          </ClickOutHandler>
        </div>
      </div>
      <div>
        <p className="my-3 text-sm">{content}</p>
        {photos?.length > 0 && (
          <div className="flex gap-4">
          {photos.map(photo => (
            // eslint-disable-next-line react/jsx-key
            <div key={photos} className="">
              <img src={photo} className="rounded-md" alt=""/>
            </div>
          ))}
        </div>
        )}

        {/* <div className="rounded-nd  overflow-hidden">
          <img src="https://images.unsplash.com/photo-1562760157-c05fe30e2e8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80" alt="" />
        </div> */}
      </div>
      <div className="flex mt-4 gap-8">
        <button className="flex gap-2 items-center" onClick={toogleLike}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={"w-6 h-6 " + (isLikedByMe ? `fill-red-500` : '')}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
          {likes?.length}
        </button>
        <button className="flex gap-2 items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
          </svg>
          {comments.length}
        </button>
        <button className="flex gap-2 items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
          3
        </button>
      </div>
      <div className="flex mt-4 gap-3">
        <div>
          <Avatar url={myProfile?.avatar} />
        </div>
        <div className="border grow rounded-full relative">
          <form onSubmit={postComment}>
            <input
              value={commentText}
              onChange={ev => setCommentText(ev.target.value)}
              className="block w-full p-3 h-12 px-4 overflow-hidden rounded-full" placeholder="Leave comment"/>
          </form>
          <label className="absolute top-3 right-3 text-gray-500">
          <input type="file" className="hidden" onChange={addPhotos}/>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
            </svg>

          </label>

        </div>
      </div>
      <div>
        {comments.length > 0 && comments.map(comment => (
          <div key={Comment} className="mt-2 flex gap-2 items-center">
            <Avatar url={comment.profiles.avatar} href={'/profile/'+ comment.profiles.id} />
            <div className="bg-gray-300 py-2 px-4 rounded-xl">
              <div>
              <Link href={'/profile/'+ comment.profiles.id}>
                <span className="hover:underline font-semibold mr-1">
                  {comment.profiles.name}
                </span>
              </Link>
              <span className="text-sm text-gray-400">
                <ReactTimeAgo timeStyle="twitter" date={(new Date(comment.created_at)).getTime()} />
              </span>
              </div>
              <p className="text-sm">{comment.content}</p>
              {upload.length > 0 && (
                <div className="flex gap-2">
                  {upload.map(uploads => (
                    // eslint-disable-next-line react/jsx-key
                    <div className="mt-2">
                      <img src={uploads} alt="" className="w-auto h-24 rounded-md" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
