import Sidebar from "./Sidebar";

export default function Layout({children, hideSidebar}) {
  return (
    <div className='flex mt-4 max-w-4xl mx-auto gap-6'>
      {!hideSidebar && (
        <div className='w-3/12'>
        <Sidebar/>
      </div>
      )}
      <div className={hideSidebar ? 'w-full' : 'w-9/12'}>
        {children}
      </div>
    </div>
  );
}
