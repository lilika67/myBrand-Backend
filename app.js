require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const allRoutes = require("./routes");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const path = require("path");

const app = express();

// Define __dirname
const _dirname = path.resolve();

// Use CORS middleware
app.use(cors({ origin: "*" }));
app.use('/uploads', express.static('upload'));

// Middleware to parse JSON bodies
app.use(express.json());

// Define Swagger options
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MyBrand API",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:4000",
        description: "Node.js Server",
      },
    ],
  },
  apis: [
    path.resolve(_dirname, "routes", "blog.routes.js"), //  blog routes
    path.resolve(_dirname, "routes", "auth.routes.js"), // authentication routes
    path.resolve(_dirname, "routes", "user.routes.js"),//user routes
    path.resolve(_dirname, "routes", "message.route.js"),  // message routes
    path.resolve(_dirname, "routes", "subscribe.router.js"), // subscribe routes
  ],
};

// Initialize Swagger
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Welcome message route
app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Welcome to my API",
  });
});

// API routes
app.use("/api/v1", allRoutes);

// Export the Express app
module.exports = app;

