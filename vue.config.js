module.exports = {
  transpileDependencies: ["vuetify"],
  pluginOptions: {
    // Apollo-related options
    apollo: {
      // Enable automatic mocking
      enableMocks: true,
      // Enable Apollo Engine
      enableEngine: true,
      // Enable ESLint for `.gql` files
      lintGQL: false
    }
  }
};
