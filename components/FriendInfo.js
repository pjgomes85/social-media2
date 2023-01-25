import Avatar from "./Avatar";

export default function FriendInfo() {
  return (
    <div className="flex gap-2">
      <Avatar />
      <div>
        <h3 className="font-bold text-xl">Jorge Silva</h3>
          <div className="text-sm leading-3">5 mutual friends</div>
      </div>
    </div>
  )

}
