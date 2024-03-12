import React from 'react';
import {Link} from 'react-router-dom';
function BoxLoading() {
  return (
    <div className="flex w-[20%] h-24 flex-nowrap">
      <div className="bg-gray-400 w-full drop-shadow-lg animate-pulse">
        <section className="group relative p-6 bg-[#f6f6f6] w-full h-[24px] cursor-pointer">
          <div className="w-full h-full bg-slate-300"></div>
          <div className="group group-hover:h-[80px] h-[55px] md:h-0 w-full group-hover:flex absolute bottom-0 left-0 bg-gray-400 bg-opacity-50 z-[1] transition-all duration-300">
            <div className="md:hidden flex group-hover:flex items-center justify-around h-full w-full p-2">
            </div>
          </div>
        </section>
        <section className="text-center text-2xl mt-2 text-white">
        </section>
      </div>
    </div>
  );
}

function Box({ href, icon: Icon, number, name, loading }) {
  if (loading) {
    return <BoxLoading />;
  }
  return (
    <Link to={href} className="bg-main w-64 h-24 flex justify-start items-center gap-3 px-8 rounded-lg shadow-xl hover:-translate-y-2 duration-300 cursor-pointer ">
      <div className="bg-sec bg-opacity-70 p-2 rounded-md">
        {Icon && <Icon className="text-white text-4xl" />}
      </div>

      <div className="text-white">
        <h1>{number}</h1>
        <h1>{name}</h1>
      </div>
    </Link>
  );
}

export default Box;
