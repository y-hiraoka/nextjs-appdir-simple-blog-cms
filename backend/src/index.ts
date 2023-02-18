import Fastify from "fastify";
import cors from "@fastify/cors";
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import z from "zod";
import {
  commentsResponse,
  createCommentRequest,
  createCommentResponse,
} from "./dto/comment";
import {
  createPostRequest,
  postDetailResponse,
  postsResponse,
  updatePostRequest,
} from "./dto/post";
import { notFoundResponse } from "./dto/system";
import { tagsResponse } from "./dto/tag";
import { createComment, getComments } from "./service/comments";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "./service/posts";
import { getTags } from "./service/tags";

const server = Fastify({});

// Add schema validator and serializer
server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.register(cors, {
  origin: "http://localhost:3000",
});

server
  .withTypeProvider<ZodTypeProvider>()
  .route({
    method: "GET",
    url: "/posts",
    schema: {
      querystring: z.object({
        tag: z.optional(z.string()),
        includeDraft: z.optional(z.literal("1")),
      }),
      response: {
        200: postsResponse,
      },
    },
    handler: async (req, res) => {
      await sleep();
      const posts = await getPosts({
        tag: req.query.tag,
        includeDraft: req.query.includeDraft === "1",
      });
      res.send(posts);
    },
  })
  .route({
    method: "GET",
    url: "/posts/:postId",
    schema: {
      params: z.object({
        postId: z.string({ required_error: "postId is required." }),
      }),
      response: {
        200: postDetailResponse,
        404: notFoundResponse,
      },
    },
    handler: async (req, res) => {
      await sleep();
      const post = await getPost({ id: req.params.postId });
      if (post === null) {
        res.status(404).send({ message: `${req.params.postId} is not found.` });
      } else {
        res.send(post);
      }
    },
  })
  .route({
    method: "POST",
    url: "/posts",
    schema: {
      body: createPostRequest,
      response: {
        200: postDetailResponse,
      },
    },
    handler: async (req, res) => {
      await sleep();
      const created = await createPost(req.body);
      res.send(created);
    },
  })
  .route({
    method: "PUT",
    url: "/posts/:postId",
    schema: {
      params: z.object({
        postId: z.string({ required_error: "postId is required." }),
      }),
      body: updatePostRequest,
      response: {
        200: postDetailResponse,
        404: notFoundResponse,
      },
    },
    handler: async (req, res) => {
      try {
        await sleep();
        const post = await updatePost({ id: req.params.postId, ...req.body });
        res.send(post);
      } catch (error) {
        res.status(404).send({ message: `${req.params.postId} is not found.` });
      }
    },
  })
  .route({
    method: "DELETE",
    url: "/posts/:postId",
    schema: {
      params: z.object({
        postId: z.string({ required_error: "postId is required." }),
      }),
      response: {
        200: postDetailResponse,
        404: notFoundResponse,
      },
    },
    handler: async (req, res) => {
      try {
        await sleep();
        const post = await deletePost({ id: req.params.postId });
        res.send(post);
      } catch (error) {
        res.status(404).send({ message: `${req.params.postId} is not found.` });
      }
    },
  })
  .route({
    method: "GET",
    url: "/posts/:postId/comments",
    schema: {
      params: z.object({
        postId: z.string({ required_error: "postId is required." }),
      }),
      response: {
        200: commentsResponse,
        404: notFoundResponse,
      },
    },
    handler: async (req, res) => {
      await sleep();
      const comments = await getComments({ postId: req.params.postId });
      res.send(comments);
    },
  })
  .route({
    method: "POST",
    url: "/posts/:postId/comments",
    schema: {
      params: z.object({
        postId: z.string({ required_error: "postId is required." }),
      }),
      body: createCommentRequest,
      response: {
        200: createCommentResponse,
        404: notFoundResponse,
      },
    },
    handler: async (req, res) => {
      try {
        await sleep();
        const created = await createComment({
          postId: req.params.postId,
          content: req.body.content,
          submitter: req.body.submitter,
        });
        res.send(created);
      } catch (error) {
        res.status(404).send({ message: `${req.params.postId} is not found.` });
      }
    },
  })
  .route({
    method: "GET",
    url: "/tags",
    schema: {
      response: {
        200: tagsResponse,
      },
    },
    handler: async (req, res) => {
      await sleep();
      const tags = await getTags();
      res.send(tags.map((t) => ({ tag: t.tag, count: t._count })));
    },
  });

server
  .listen({ port: 4000, host: "0.0.0.0" })
  .then(() => console.log("start server at http://localhost:4000"));

const sleep = (ms = 1000) => new Promise<void>((res) => setTimeout(res, ms));
