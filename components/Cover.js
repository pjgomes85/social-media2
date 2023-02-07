
export default function Cover({url}) {
  return (
    <div className="h-40 overflow-hidden flex justify-center items-center">
      {<img src={url} alt="" className="src" />}
    </div>
  )

}
