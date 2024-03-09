import Link from "next/link";
import {redirect} from "next/navigation";

import api from "@/api";

import SearchBox from "./components/SearchBox";

// export const dynamic = "force-dynamic"; // por defecto: auto

// export const revalidate = 100; // por defecto: false

export default async function HomePage({searchParams}: {searchParams: {q: string}}) {
  //const restaurants = await api.list();
  // console.log(restaurants);

  const restaurants = await api.search(searchParams.q);

  async function searchAction(formData: FormData) {
    "use server";

    redirect(`/?q=${formData.get("query")}`);
  }

  return (
    <section>
      {/*<SearchBox />*/}
      <form action={searchAction} className="mb-4 inline-flex gap-2">
        <input className="px-2" defaultValue={searchParams.q || ""} name="query" />
        <button className="bg-white/20 p-2" type="submit">
          Search
        </button>
      </form>
      <section className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
        {restaurants.map((restaurant) => {
          return (
            <article key={restaurant.id}>
              <img
                alt={restaurant.name}
                className="mb-3 h-[300px] w-full object-cover"
                src={restaurant.image}
              />
              <h2 className="inline-flex gap-2 text-lg font-bold">
                {/*<span>{restaurant.name}</span>*/}
                <Link key={restaurant.id} href={`/${restaurant.id}`} prefetch={false}>
                  {restaurant.name}
                </Link>
                <small className="inline-flex gap-1">
                  <span>⭐</span>
                  <span>{restaurant.score}</span>
                  <span className="font-normal opacity-75">({restaurant.ratings})</span>
                </small>
              </h2>
              <p className="opacity-90">{restaurant.description}</p>
            </article>
          );
        })}
      </section>
    </section>
  );
}
