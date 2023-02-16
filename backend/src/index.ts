import Fastify from "fastify";
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
import { createComment, getComments } from "./service/comments";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "./service/posts";

const server = Fastify({});

// Add schema validator and serializer
server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server
  .withTypeProvider<ZodTypeProvider>()
  .route({
    method: "GET",
    url: "/posts",
    schema: {
      querystring: z.object({
        includeDraft: z.optional(z.boolean()),
      }),
      response: {
        200: postsResponse,
      },
    },
    handler: async (req, res) => {
      const posts = await getPosts({
        includeDraft: req.query.includeDraft ?? false,
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
      const comments = await getComments({ postId: req.params.postId });
      if (comments.length > 0) {
        res.send(comments);
      } else {
        res
          .status(404)
          .send({ message: `${req.params.postId}'s comments is not found.` });
      }
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
  });

server
  .listen({ port: 4000, host: "0.0.0.0" })
  .then(() => console.log("start server at http://localhost:4000"));
