"use client";

import { useState } from "react";

export default function StarRating({ rating, setRating }) {
  const [hover, setHover] = useState(null);
  const displayValue = hover !== null ? hover : rating / 2;

  return (
    <div className="star_container">
      {[...Array(5)].map((_, index) => {
        const starIndex = index + 1;

        return (
          <div
            key={index}
            className="star_item"
            onMouseMove={(e) => {
              const { left, width } = e.currentTarget.getBoundingClientRect();
              const isHalf = e.clientX - left < width / 2;
              setHover(isHalf ? starIndex - 0.5 : starIndex);
            }}
            onMouseLeave={() => setHover(null)}
            onClick={() => {
              setRating((hover || displayValue) * 2);
            }}
          >
            {/* 배경 별은 CSS의 ::before에서 처리 */}
            <div
              className="star_fill"
              style={{
                width: `${displayValue >= starIndex
                  ? 100
                  : displayValue === starIndex - 0.5
                    ? 50
                    : 0
                  }%`,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}