import React from "react";
import Filters from "../../components/PoliceOperator/Home/Filters";
import VideoSamples from "../../components/PoliceOperator/Home/VideoSamples";
import PaginationRounded from "../../components/PoliceOperator/Home/Pagination";
import { useEffect } from "react";

export default function Home() {

 useEffect(() => {
    localStorage.removeItem('selectedOffences');
  }, []);
  
  return (
    <>
      <div className="flex-auto overflow-hidden w-[99%]">
        <div className="flex flex-col h-full">
          <Filters />
          <div className="overflow-y-auto">
            <div className="max-h-[calc(100vh-100px)] w-[99%]">
              <VideoSamples />
            </div>
          </div>
        </div>
      </div>
      <div className="ml-[38%] mt-10">
        <PaginationRounded />
      </div>
    </>
  );
}
