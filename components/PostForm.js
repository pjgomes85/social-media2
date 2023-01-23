import Card from "./Card";

export default function PostForm() {
  return (
    <Card>
      <div className="flex gap-3">
        <div>
          <div className="w-12 rounded-full overflow-hidden">
            <img src="https://scontent-lhr8-1.xx.fbcdn.net/v/t1.6435-9/44481318_2264696876897414_1989818533889966080_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=174925&_nc_ohc=ec5PxzyGHIcAX8FJ4EV&tn=bMn87lzrdFr5XjvA&_nc_ht=scontent-lhr8-1.xx&oh=00_AfBuKXkH4sTovfpA8NyNLO57dRtnUzrv4xjdiMWLUe6RTw&oe=63F653E3" alt="" />
          </div>
        </div>
        <textarea className="grow py-3" placeholder={'Whats on your mind, Paulo?'} />
      </div>
    </Card>
  );
}
