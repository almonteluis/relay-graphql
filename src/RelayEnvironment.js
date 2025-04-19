import { Environment, Network, RecordSource, Store } from "relay-runtime";

async function fetchGraphQL(params, variables) {
  console.log(
    `fetching query ${params.name} with variables ${JSON.stringify(variables)}`
  );

  const response = await fetch("https://nextjs-randomuser-graphql.vercel.app/api/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: params.text, // This is the full query string Relay generates
      variables,
    }),
  });

  return await response.json();
}

export default new Environment({
  network: Network.create(fetchGraphQL),
  store: new Store(new RecordSource()),
});
