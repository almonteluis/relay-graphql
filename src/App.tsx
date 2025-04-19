import React, { Suspense, useState } from "react";
import {
  RelayEnvironmentProvider,
  usePreloadedQuery,
  loadQuery,
} from "react-relay/hooks";
import RelayEnvironment from "./RelayEnvironment";
import { AppUserStatsQuery } from "./queries/AppUserStatsQuery";
import type { AppUserStatsQuery as AppUserStatsQueryType } from "./__generated__/AppUserStatsQuery.graphql";
import "./App.css";
const preloadedQuery = loadQuery<AppUserStatsQueryType>(
  RelayEnvironment,
  AppUserStatsQuery,
  { count: 10, nat: "us" }
);

function UserStats({ preloadedQuery }) {
  const data = usePreloadedQuery<AppUserStatsQueryType>(
    AppUserStatsQuery,
    preloadedQuery
  );

  return (
    <div className="mt-6 space-y-4">
      {data.users.map((user, index) => (
        <div
          key={index}
          className="p-4 border rounded-lg shadow-sm bg-white flex justify-between items-center"
        >
          <div className="text-gray-700 font-medium">{user.name.last}</div>
          <div className="text-sm text-gray-500">
            Age: {user.dob.age} | State: {user.location.state} | {user.gender}
          </div>
        </div>
      ))}
    </div>
  );
}

function AppRoot() {
  const [count, setCount] = useState(10);
  const [nat, setNat] = useState("us");
  const [queryRef, setQueryRef] = useState(() =>
    loadQuery<AppUserStatsQueryType>(RelayEnvironment, AppUserStatsQuery, {
      count: 10,
      nat: "us",
    })
  );

  const handleSubmit = () => {
    const newQuery = loadQuery<AppUserStatsQueryType>(
      RelayEnvironment,
      AppUserStatsQuery,
      {
        count,
        nat,
      }
    );
    setQueryRef(newQuery);
  };

  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-xl mx-auto bg-white shadow-md p-6 rounded-lg">
          <h1 className="text-xl font-bold text-gray-800 mb-4">
            Fetch User Stats
          </h1>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Count
              </label>
              <input
                type="number"
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Nationality (e.g. us, fr)
              </label>
              <input
                type="text"
                value={nat}
                onChange={(e) => setNat(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <button
              onClick={handleSubmit}
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition"
            >
              Fetch
            </button>
          </div>
          <Suspense
            fallback={<div className="mt-6 text-gray-500">Loading...</div>}
          >
            <UserStats preloadedQuery={queryRef} />
          </Suspense>
        </div>
      </div>
    </RelayEnvironmentProvider>
  );
}

export default AppRoot;
