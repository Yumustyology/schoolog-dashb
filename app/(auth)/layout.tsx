import React from 'react';

function Authlayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="grid grid-cols-5 w-full h-screen ">
        <div className="w-full h-full lgTablet:col-span-2 bg-green-900 tablet:col-span-1 xxs:hidden tablet:block "></div>
        <div className="w-full h-full flex justify-center items-center lgTablet:col-span-3 tablet:col-span-4 xxs:col-span-5">
          {children}
        </div>
      </main>
    </>
  );
}

export default Authlayout;
