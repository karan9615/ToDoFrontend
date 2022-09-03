import React from "react";

const NavigationBar = () => {
  
  return (
    <div className="fixed bg-gradient-to-t from-blue-500 to-blue-600 w-full h-20 shadow-lg p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-5 cursor-pointer">
          <img src="https://cdn.pixabay.com/photo/2015/11/26/16/28/vintage-1064142__340.png" alt="" className="bg-white w-12 h-12 rounded-full p-1" />
          <span className="text-2xl text-white font-bold hidden sm:block">NOTELAPS</span>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
