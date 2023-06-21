import { config } from "dotenv";
config();
import fastify from "fastify";

const app = fastify();
console.log("Server is running on port " + process.env.PORT!);
app.listen({ port: parseInt(process.env.PORT!) });
