import React from "react";
import RecentProduct from "../RecentProduct/RecentProduct";
export default function Products() {
  return (
    <>
      <form class="w-full mx-auto">
        <label
          for="default-search"
          class="text-sm font-medium text-gray-900 sr-only"
        >
          Search
        </label>
        <div class="relative">
          <input
            type="search"
            id="default-search"
            class="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:border-emerald-500 outline-emerald-500"
            placeholder="Search..."
            required
          />
        </div>
      </form>
      <RecentProduct/>
    </>
  );
}
