// src/queries/AppUserStatsQuery.js
import graphql from "babel-plugin-relay/macro";

export const AppUserStatsQuery = graphql`
  query AppUserStatsQuery($count: Int!, $nat: String!) {
    users(results: $count, nat: $nat) {
      gender
      dob {
        age
      }
      name {
        last
      }
      location {
        state
      }
    }
  }
`;
