
export default function Cover({url, editable}) {
  return (
    <div className="h-36 overflow-hidden flex justify-center items-center relative">
      <div>
        {<img src={url} alt="" className="src" />}
      </div>
      {editable && (
      <div className="absolute right-0 bottom-0 m-2">
        <button>Change cover image</button>
      </div>
      )}
    </div>
  );

}
