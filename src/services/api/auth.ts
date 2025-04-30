const GRAPHQL_ENDPOINT = "http://localhost:3000/graphql";

export async function signup({
  email,
  username,
  password,
}: {
  email: string;
  username: string;
  password: string;
}) {
  const query = `
    mutation Signup($input: SignupInput!) {
      signup(input: $input) {
        user {
          id
          email
          username
        }
        token
      }
    }
  `;

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        input: { email, username, password },
      },
    }),
  });

  const result = await response.json();
  if (result.errors) throw new Error(result.errors[0].message);
  return result.data.signup;
}

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const query = `
    mutation Login($input: LoginInput!) {
      login(input: $input) {
        token
      }
    }
  `;

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        input: { email, password },
      },
    }),
  });

  const result = await response.json();
  if (result.errors) throw new Error(result.errors[0].message);
  return result.data.login;
}
