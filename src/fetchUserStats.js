export default async function fetchUserStats(params, variables) {
  const response = await fetch(
    "https://nextjs-randomuser-graphql.vercel.app/api/graphql",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: params.text,
        variables,
      }),
    }
  );
  return await response.json();
}
