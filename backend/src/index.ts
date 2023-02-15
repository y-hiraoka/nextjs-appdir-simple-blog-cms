import Fastify, { FastifyInstance } from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import z from "zod";

const server: FastifyInstance = Fastify({});

// Add schema validator and serializer
server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.withTypeProvider<ZodTypeProvider>().route({
  method: "GET",
  url: "/",
  // Define your schema
  schema: {
    querystring: z.object({
      name: z.string().min(4, "ちゃんといれなはれ"),
    }),
    response: {
      200: z.object({
        foo: z.string(),
        bar: z.string(),
      }),
    },
  },
  handler: (req, res) => {
    res.send({ foo: req.query.name, bar: "barrrka" });
  },
});

server
  .listen({ port: 4000, host: "0.0.0.0" })
  .then(() => console.log("start server at http://localhost:4000"));
