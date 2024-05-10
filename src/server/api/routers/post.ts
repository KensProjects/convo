
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";

export const postRouter = createTRPCRouter({
  createPost: protectedProcedure
    .input(z.object({ body: z.string().min(1).max(500) })
    ).mutation(async ({ ctx, input }) => {
      return ctx.db.post.create({
        data: {
          body: input.body,
          createdById: ctx.session.user.id,
        }
      })
    }),
  getPost: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.post.findUnique({
        where: {
          id: input.id
        },
      })
    }),
  editPost: protectedProcedure
    .input(z.object({ id: z.string(), body: z.string().min(1).max(500) })
    ).mutation(async ({ ctx, input }) => {
      return ctx.db.post.update({
        where: {
          id: input.id,
          createdById: ctx.session.user.id,
        },
        data: {
          body: input.body,
        }
      })
    }),
  deletePost: protectedProcedure
    .input(z.object({ id: z.string() })
    ).mutation(async ({ ctx, input }) => {
      return ctx.db.post.delete({
        where: {
          id: input.id,
          createdById: ctx.session.user.id,
        },
      })
    }),
  toggleLikeForPost: protectedProcedure
    .input(z.object({ id: z.string() })
    ).mutation(async ({ ctx, input }) => {

      const likedUsersInPost = await ctx.db.post.findUnique({
        where: { id: input.id },
        select: {
          likedByIds: true
        }
      })

      const postAlreadyLikedByUser = await ctx.db.post.findUnique({
        where: {
          id: input.id,
          likedByIds: {
            has: ctx.session.user.id
          }
        }
      })

      if (!postAlreadyLikedByUser) {
        return ctx.db.post.update({
          where: {
            id: input.id
          },
          data: {
            likes: { increment: 1 },
            likedByIds: {
              push: ctx.session.user.id
            }
          },

        })
      } else {

        //remove from likedByIds later
        return ctx.db.post.update({
          where: {
            id: input.id
          },
          data: {
            likes: { decrement: 1 },
            likedByIds: {
              set: likedUsersInPost?.likedByIds.filter(id => id !== ctx.session.user.id)
            }
          },
        })
      }


    }),
  getLikedUsersByPost: protectedProcedure
    .input(z.object({ id: z.string(), likedByIds: z.array(z.string()) }))
    .query(async ({ ctx, input }) => {

      return ctx.db.user.findMany({
        where: {
          id: {
            in: input.likedByIds
          },
        },
        select: {
          username: true,
          image: true,
          name: true,
          bio: true
        }
      })
    }),
  searchPublicPosts: protectedProcedure
    .input(z.object({ body: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.post.findMany({
        take: 10,
        where: {
          body: {
            contains: input.body,
            mode: 'insensitive',
          },
        },
      })
    })
})

