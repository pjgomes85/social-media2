import Avatar from "./Avatar";
import Card from "./Card";

export default function PostCard() {
  return (
    <Card>
      <div className="flex gap-3">
        <div>
          <Avatar />
        </div>
        <div>
          <p><a className="font-semibold">Paulo Gomes</a> shared a <a className="text-socialBlue">album</a></p>
          <p className="text-gray-500 text-sm">1 hours ago</p>
        </div>
      </div>
    </Card>
  );
}
