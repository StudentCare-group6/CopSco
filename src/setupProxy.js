module.exports = (app) => {
    app.use((_, res, next) => {
      console.log("Setting headers");
      res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
      res.setHeader("Cross-Origin-Embedder-Policy", "credentialless");
      next();
    });
  };