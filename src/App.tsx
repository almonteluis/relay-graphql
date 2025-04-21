import React, { Suspense, useState } from "react";
import {
  RelayEnvironmentProvider,
  usePreloadedQuery,
  loadQuery,
} from "react-relay/hooks";
import RelayEnvironment from "./RelayEnvironment";
import { AppUserStatsQuery } from "./queries/AppUserStatsQuery";
import type { AppUserStatsQuery as AppUserStatsQueryType } from "./__generated__/AppUserStatsQuery.graphql";
import {
  getGenderPercentages,
  getAgeRangePercentages,
  getLastNameLengthCounts,
  getTop10StatePercentages,
} from "./utils/userStats.ts";

import "./App.css";
const preloadedQuery = loadQuery<AppUserStatsQueryType>(
  RelayEnvironment,
  AppUserStatsQuery,
  { count: 200, nat: "us" }
);

const defaultVariables = { count: 200, nat: "us" };

function StatsDisplay({ users }: { users: any[] }) {
  const genderStats = getGenderPercentages(users);
  const ageStats = getAgeRangePercentages(users);
  const nameLengthStats = getLastNameLengthCounts(users);
  const topStates = getTop10StatePercentages(users);

  const renderStat = (
    title: string,
    stats: Record<string | number, string | number>
  ) => (
    <div className="mb-4">
      <h3 className="font-semibold mb-1">{title}</h3>
      <ul className="text-sm text-gray-700 pl-4 list-disc">
        {Object.entries(stats).map(([key, value]) => (
          <li key={key}>
            {key}: {value}%
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="space-y-4">
      {renderStat("Gender Percentages", genderStats)}
      {renderStat("Age Range Percentages", ageStats)}
      {renderStat("Top 10 States", topStates)}
      {renderStat("Last Name Length Counts", nameLengthStats)}
    </div>
  );
}

function StatsRoot({ preloadedQuery }: { preloadedQuery: any }) {
  const data = usePreloadedQuery<AppUserStatsQueryType>(
    AppUserStatsQuery,
    preloadedQuery
  );
  return <StatsDisplay users={data.users} />;
}

function AppRoot() {
  const [count, setCount] = useState(defaultVariables.count);
  const [nat, setNat] = useState(defaultVariables.nat);
  const [queryRef, setQueryRef] = useState(() =>
    loadQuery<AppUserStatsQueryType>(
      RelayEnvironment,
      AppUserStatsQuery,
      defaultVariables
    )
  );
  const [error, setError] = useState("");

  const handleFetch = () => {
    if (count < 1 || count > 5000) {
      setError("Count must be between 1 and 5000");
      return;
    }
    if (!/^[a-z]{2}$/i.test(nat)) {
      setError("Nationality must be a two-letter code");
      return;
    }
    setError("");
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
      <div className="max-w-2xl mx-auto px-4 py-6">
        <h1 className="text-xl font-bold mb-4">User Statistics Dashboard</h1>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium">Number of Users</label>
            <input
              type="number"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-full mt-1 p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Nationality (e.g. us, fr)
            </label>
            <input
              type="text"
              value={nat}
              onChange={(e) => setNat(e.target.value)}
              className="w-full mt-1 p-2 border rounded"
            />
          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <button
            onClick={handleFetch}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded shadow"
          >
            Fetch Users
          </button>
        </div>

        <Suspense fallback={<div>Loading stats...</div>}>
          <StatsRoot preloadedQuery={queryRef} />
        </Suspense>
      </div>
    </RelayEnvironmentProvider>
  );
}

export default AppRoot;
