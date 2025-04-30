import { gql } from "@apollo/client";

export const ADD_EXPENSE = gql`
  mutation AddExpense(
    $title: String!
    $amount: Float!
    $category: String!
    $createdAt: String!
  ) {
    addExpense(
      title: $title
      amount: $amount
      category: $category
      createdAt: $createdAt
    ) {
      id
      title
      amount
      category
      createdAt
    }
  }
`;

export const DELETE_EXPENSE = gql`
  mutation DeleteExpense($id: String!) {
    deleteExpense(id: $id) {
      id
      title
      amount
      category
      createdAt
    }
  }
`;

export const DELETE_ALL_EXPENSES = gql`
  mutation DeleteAllExpenses {
    deleteAllExpenses
  }
`;

export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      token
    }
  }
`;
