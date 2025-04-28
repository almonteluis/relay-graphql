export function getGenderPercentages(users: any[]) {
  const total = users.length;
  const counts: Record<string, number> = users.reduce((acc, user) => {
    acc[user.gender] = (acc[user.gender] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.fromEntries(
    Object.entries(counts).map(([gender, count]: [string, number]) => [
      gender,
      ((count / total) * 100).toFixed(2),
    ])
  );
}

export function getAgeRangePercentages(users: any[]) {
  const ranges = {
    "0-20": 0,
    "21-40": 0,
    "41-60": 0,
    "61-80": 0,
    "81-100": 0,
    "100+": 0,
  };

  users.forEach(({ dob }) => {
    const age = dob.age;
    if (age <= 20) ranges["0-20"]++;
    else if (age <= 40) ranges["21-40"]++;
    else if (age <= 60) ranges["41-60"]++;
    else if (age <= 80) ranges["61-80"]++;
    else if (age <= 100) ranges["81-100"]++;
    else ranges["100+"]++;
  });

  const total = users.length;
  return Object.fromEntries(
    Object.entries(ranges).map(([range, count]) => [
      range,
      ((count / total) * 100).toFixed(2),
    ])
  );
}

export function getLastNameLengthCounts(users: any[]) {
  const counts: Record<number, number> = {};

  users.forEach(({ name }) => {
    const len = name.last.length;
    counts[len] = (counts[len] || 0) + 1;
  });

  return counts;
}

export function getTop10StatePercentages(users: any[]) {
  const stateCounts: Record<string, number> = {};

  users.forEach(({ location }) => {
    stateCounts[location.state] = (stateCounts[location.state] || 0) + 1;
  });

  const total = users.length;

  const sortedStates = Object.entries(stateCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  return Object.fromEntries(
    sortedStates.map(([state, count]) => [
      state,
      ((count / total) * 100).toFixed(2),
    ])
  );
}
