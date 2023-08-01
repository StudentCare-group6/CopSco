import React from "react";
import Filters from "../../components/PoliceOperator/Home/Filters";
import VideoSamples from "../../components/PoliceOperator/Home/VideoSamples";
import PaginationRounded from "../../components/PoliceOperator/Home/Pagination";


export default function Home() {
  
  return (
    <>
      <div className="flex-auto overflow-hidden">
        <div className="flex flex-col h-full">
          <Filters />
          <div className="overflow-y-auto">
            <div className="max-h-[calc(100vh-100px)]">
              <VideoSamples />
            </div>
          </div>
        </div>
      </div>
      <div className="pagination-center-aligned">
        <PaginationRounded />
      </div>
    </>
  );
}
