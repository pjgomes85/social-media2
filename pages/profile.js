import Avatar from "@/components/Avatar";
import Card from "@/components/Card";
import Layout from "@/components/Layout";

export default function ProfilePage() {
  return (
    <Layout>
      <Card noPadding={true}>
        <div className="relative overflow-hidden rounded-md">
          <div className="h-40 overflow-hidden flex justify-center items-center">
            <img src="https://images.unsplash.com/photo-1595838133174-a772f5358609?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="" className="src" />
          </div>
          <div className="absolute top-24 left-4">
            <Avatar size={'lg'}/>
          </div>
          <div className="p-4 pb-24">
            <div className="ml-40">
              <h1 className="text-2xl font-bold">
                Paulo Gomes
              </h1>
              <div className="text-gray-500 leading-4">Cascais, Portugal</div>
            </div>
          </div>
        </div>
      </Card>
    </Layout>

  );
}
