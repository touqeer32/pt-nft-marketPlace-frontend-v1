import React from "react";

export default function FooterSubscribe() {
  return (
    <div>
      <br />
      <form>
        <label
          // htmlhtmlhtmlFor="default-search"
          className="mb-2 text-sm font-medium sr-only"
        >
          Search
        </label>
        <div className="relative">
          <input
            type="search"
            id="default-search"
            className="block p-4 pl-10 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Subscribe to our list"
            required
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-lime-400 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            Join
          </button>
        </div>
      </form>
    </div>
  );
}
