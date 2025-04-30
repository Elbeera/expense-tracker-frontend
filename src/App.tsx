import React from "react";
import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import client from "./services/apollo/client";
import RootRoutes from "./routes/Root";

function App() {
  return (
    <React.StrictMode>
      <ApolloProvider client={client}>
        <ChakraProvider>
          <RootRoutes />
        </ChakraProvider>
      </ApolloProvider>
    </React.StrictMode>
  );
}

export default App;
