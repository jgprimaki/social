import path from "path";
// Load .env files
import { loadEnv } from "vue-cli-plugin-apollo/utils/load-env";
const env = loadEnv([
  path.resolve(__dirname, ".env"),
  path.resolve(__dirname, ".env.local")
]);

module.exports = {
  client: {
    service: env.VUE_APP_APOLLO_ENGINE_SERVICE,
    includes: ["src/**/*.{js,jsx,ts,tsx,vue,gql}"]
  },
  service: {
    endpoint: {
      url: env.VUE_APP_GRAPHQL_HTTP
    },
    name: env.VUE_APP_APOLLO_ENGINE_SERVICE,
    localSchemaFile: path.resolve(
      __dirname,
      "./node_modules/.temp/graphql/schema.json"
    )
  },
  engine: {
    endpoint: process.env.APOLLO_ENGINE_API_ENDPOINT,
    apiKey: env.VUE_APP_APOLLO_ENGINE_KEY
  }
};
