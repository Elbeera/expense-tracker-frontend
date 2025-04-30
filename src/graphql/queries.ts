import { gql } from "@apollo/client";

export const GET_EXPENSES = gql`
  query GetExpenses {
    getExpenses {
      id
      title
      amount
      category
      createdAt
    }
  }
`;
