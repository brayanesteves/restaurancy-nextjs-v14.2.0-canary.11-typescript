"use client";

import Link from "next/link";

export default function RestaurantCardSingle({
  restaurant,
}: {
  restaurant: {
    id: string;
    name: string;
    image: string;
    description: string;
    score: number;
    ratings: number;
  };
}) {
  const isFavourite = window.localStorage.getItem("favorites")?.includes(restaurant.id);

  return (
    <article>
      <img
        alt={restaurant.name}
        className="mb-3 h-[300px] w-full object-cover"
        src={restaurant.image}
      />
      <h2 className="inline-flex items-center gap-2 text-lg font-bold">
        <Link href={`/${restaurant.id}`}>
          <span>{restaurant.name}</span>
        </Link>
        <small className="inline-flex gap-1">
          <span>⭐</span>
          <span>{restaurant.score}</span>
          <span className="font-normal opacity-75">({restaurant.ratings})</span>
        </small>
        <button
          className={`text-xl text-red-500 ${isFavourite ? "opacity-100" : "opacity-20"}`}
          type="button"
        >
          ♥
        </button>
      </h2>
      <p className="opacity-90">{restaurant.description}</p>
    </article>
  );
}
