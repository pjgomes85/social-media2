import Sidebar from "./Sidebar";

export default function Layout({children, hideSidebar}) {
  let rightColumnClasses = '';
  if (hideSidebar) {
    rightColumnClasses += 'w-full';
  } else {
    rightColumnClasses += 'mx-4 md:mx-0 md:w-9/12';
  }
  return (
    <div className='md:flex mt-4 max-w-4xl mx-auto gap-6 mb-24'>
      {!hideSidebar && (
        <div className='fixed md:static bottom-0 w-full md:w-3/12 -mb-5'>
        <Sidebar/>
      </div>
      )}
      <div className={rightColumnClasses}>
        {children}
      </div>
    </div>
  );
}
