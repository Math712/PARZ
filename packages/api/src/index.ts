import Fastify from "fastify";
import * as process from "process";
import cors from "@fastify/cors";
import { Pool } from "pg";

// Register the server
const fastify = Fastify({ logger: true });
fastify.register(cors, {
  origin: "http://localhost:5000",
  methods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"],
  credentials: true,
});

const pool = new Pool({
  port: 5432,
  host: "sql-api-test",
  database: "main",
  user: "main",
  password: "main",
});

// Execute a sql query
const query = async (statement: string, params: (string | number)[]) => {
  const client = await pool.connect();
  const res = (await client.query(statement, params)).rows;
  client.release();
  return res;
};

// Declare routes
fastify.get("/", async (request, reply) => {
  // TODO Write the request here
  const statement = "SELECT * FROM trips WHERE id = $1;";
  const params = [1];
  const response = await query(statement, params);

  return reply.send(response);
});

fastify.get("/cab/revenue", async (request, reply) => {
  const {start_date, end_date} = request.query as { start_date: string, end_date: string }
  if(!start_date || !end_date) {
    return reply.status(403).send({message: 'Error'})
  }
  const statement = "SELECT cab_id, SUM(total_amount + tip_amount) AS total_revenue FROM trips WHERE started_at >= $1 AND started_at < $2 GROUP BY cab_id ORDER BY total_revenue DESC LIMIT 5;"
  const response = await query(statement, [start_date, end_date]);
  return reply.send(response);
})

fastify.get("/revenue", async (request, reply) => {
  const {start_date, end_date} = request.query as { start_date: string, end_date: string }
  if(!start_date || !end_date) {
    return reply.status(403).send({message: 'Error'})
  }
  const statement = "SELECT SUM(total_amount) AS total_revenue, SUM(tip_amount) as total_tips FROM trips WHERE started_at >= $1 AND started_at < $2;"
  const response = await query(statement, [start_date, end_date]);
  return reply.send(response);
})

fastify.get("/trips/count", async (request, reply) => {
  const {start_date, end_date} = request.query as { start_date: string, end_date: string }
  if(!start_date || !end_date) {
    return reply.status(403).send({message: 'Error'})
  }
  const statement = 'SELECT COUNT(*) AS total_trips FROM trips WHERE started_at >= $1 AND started_at < $2;';
  const response = await query(statement, [start_date, end_date]);
  return reply.send(response);
});

fastify.get("/trips/average-time", async (request, reply) => {
  const {start_date, end_date} = request.query as { start_date: string, end_date: string }
  if(!start_date || !end_date) {
    return reply.status(403).send({message: 'Error'})
  }
  const statement = "SELECT AVG(ended_at - started_at) AS average_trip_duration FROM trips WHERE started_at >= $1 AND started_at < $2;"
  const response = await query(statement, [start_date, end_date]);
  return reply.send(response);
})

fastify.get("/trips/count-by-date", async (request, reply) => {
  const {start_date, end_date} = request.query as { start_date: string, end_date: string }
  if(!start_date || !end_date) {
    return reply.status(403).send({message: 'Error'})
  }
  const statement = "SELECT DATE(started_at) as start_day, COUNT(*) AS total_trips FROM trips WHERE started_at >= $1 AND started_at < $2 GROUP BY start_day ORDER BY start_day;"
  const response = await query(statement, [start_date, end_date]);
  return reply.send(response);
})

// Run the serverw
try {
  fastify.listen({ port: 3000, host: "0.0.0.0" }).then();
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
