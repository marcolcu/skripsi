"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import Card from "./Card";

const CurrentFav = () => {
  const [value, setValue] = useState(true);

  return (
    <main>
      <div className="bg-white">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          <FontAwesomeIcon icon={faStar} />
          &nbsp;Current Fav
        </h2>

        {value ? (
          <Card />
        ) : (
          <div className="w-full h-[100px] flex items-center justify-center">
            <p>There is no product</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default CurrentFav;
