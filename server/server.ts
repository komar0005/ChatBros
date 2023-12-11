import fastify from 'fastify'
import { config } from 'dotenv'
import { userRoutes } from "./routes/users";
import cors from "@fastify/cors";

require('dotenv').config();
const app = fastify()
app.register(cors, {origin: process.env.CLIENT_SERVER})
app.register(userRoutes)
app.listen({port: parseInt(process.env.PORT!)})