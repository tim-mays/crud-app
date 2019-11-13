# Aquent developer candidate project

This fork of the Aquent developer candidate project uses React v16.11.0 for the client and GraphQL on the Java server.

To start the GraphQL server...

```
cd crud-app/server
mvn install
mvn spring-boot:run
```

The GraphQL service can be found at [http://localhost:8081/graphql](http://localhost:8081/graphql) and there is a GraphQL IDE available at [http://localhost:8081/graphiql](http://localhost:8081/graphiql)

To start the React App...

```
cd crud-app/client
yarn install
yarn start
```

Open [http://localhost:3000](http://localhost:3000) to view the app in the browser
