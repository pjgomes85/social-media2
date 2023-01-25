import Layout from "@/components/Layout";
import PostCard from "@/components/PostCard";

export default function SavedPosts() {
  return (
    <Layout>
      <h1 className="text-6xl mb-4 text-gray-400">Saved Posts</h1>
      <PostCard />
      <PostCard />
    </Layout>
  )
}
