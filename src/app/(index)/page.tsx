import Link from "next/link";
import {redirect} from "next/navigation";

import api from "@/api";

import RestaurantCard from "../components/RestaurantCard";

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
          return <RestaurantCard key={restaurant.id} restaurant={restaurant} />;
        })}
      </section>
    </section>
  );
}
