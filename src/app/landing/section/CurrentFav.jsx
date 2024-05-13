"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import Card from "./Card";

const CurrentFav = (event) => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const data = event?.event;

  useEffect(() => {
    if (data !== null) {
      setDataLoaded(true);
    }
  }, [data]);

  return (
    <main>
      <div className="bg-white mb-5">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            {dataLoaded && <FontAwesomeIcon icon={faStar} />}
            &nbsp;Current Fav
          </h2>
          <a href="#">Let's go &rarr;</a>
        </div>
        {dataLoaded ? (
          data ? (
            <Card events={data} />
          ) : (
            <div className="w-full h-[100px] flex items-center justify-center">
              <p>There is no product</p>
            </div>
          )
        ) : (
          <p className="text-center">Loading...</p>
        )}
      </div>
    </main>
  );
};

export default CurrentFav;
