import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Avatar from "./Avatar";
import Card from "./Card";
import { useState, useContext } from "react";
import { UserContext } from "./contexts/UserContext";
import Preloader from "./Preloader";


export default function PostForm({onPost}) {
  const [content, setContent] = useState('');
  const [upload, setUpload] = useState([]);
  const [isUploading, setIsUploading] = useState(false)
  const supabase = useSupabaseClient();
  const session = useSession();
  const {profile} = useContext(UserContext);
  console.log(profile);

  async function addPhotos(ev) {
    const files = ev.target.files;
    if (files.length > 0) {
      setIsUploading(true);
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
       setIsUploading(false);
    }
  }






  function createPost() {
    supabase.from('posts').insert({
      author: session.user.id, content
      }).then(response => {
        if(!response.error) {
          setContent('');
          if (onPost) {
            onPost()
          }
        }
    });
  }



  return (
    <Card>
      <div className="flex gap-2">
        <div>
          <Avatar url={profile?.avatar} />
        </div>
        {profile && (
          <textarea value={content} onChange={e => setContent(e.target.value)} className="grow p-3 h-14" placeholder={`Whats on your mind, ${profile?.name}?`} />
        )}
      </div>
      {isUploading && (
        <div>
          <Preloader />
        </div>
      )}
      {upload.length > 0 && (
        <div className="flex gap-2">
          {upload.map(uploads => (
            <div className="">
              <img src={uploads} alt="" className="w-auto h-24 rounded-md" />
            </div>
          ))}
        </div>
      )}
      <div className="flex gap-6 items-center mt-2">

          <div>
            <label className="flex gap-1">
              <input type="file" className="hidden" multiple onChange={addPhotos}/>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <span className="hidden md:block">Photos</span>
            </label>
          </div>

          <div>
            <button className="flex gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
              </svg>
              <span className="hidden md:block">Check In</span>
            </button>
          </div>

          <div>
            <button className="flex gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
              </svg>
              <span className="hidden md:block">Mood</span>
            </button>
          </div>
          <div className="grow text-right">
            <button onClick={createPost} className="bg-socialBlue text-white px-6 py-1 rounded-md ">
              Share
            </button>
          </div>
      </div>
    </Card>
  );
}
