import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  // publicProcedure,
} from "@/server/api/trpc";

export const directMessageRouter = createTRPCRouter({
  createDirectMessage: protectedProcedure
    .input(z.object({ recipientId: z.string(), body: z.string().min(1).max(500) })
    ).mutation(async ({ ctx, input }) => {
      return ctx.db.directMessage.create({
        data: {
          body: input.body,
          createdById: { connect: { id: ctx.session.user.id } },
          recipient: { connect: { id: input.recipientId } }
        }
      })
    }),
  editDirectMessage: protectedProcedure
    .input(z.object({ id: z.string(), body: z.string().min(1).max(500) })
    ).mutation(async ({ ctx, input }) => {
      return ctx.db.directMessage.update({
        where: {
          id: input.id,
          userId: { connect: { id: ctx.session.user.id } },
        },
        data: {
          body: input.body,
        }
      })
    }),
  deleteDirectMessage: protectedProcedure
    .input(z.object({ id: z.string() })
    ).mutation(async ({ ctx, input }) => {
      return ctx.db.directMessage.delete({
        where: {
          id: input.id,
          userId: { connect: { id: ctx.session.user.id } },
        },
      })
    }),
  toggleLikeDirectMessage: protectedProcedure
    .input(z.object({ id: z.string(), isLiked: z.boolean() })
    ).mutation(async ({ ctx, input }) => {
      return ctx.db.directMessage.update({
        where: {
          id: input.id
        },
        data: {
          isLiked: input.isLiked
        }
      })
    }),
  toggleAllReadDirectMessageByUser: protectedProcedure
    .input(z.object({ createdById: z.string(), isRead: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.directMessage.updateMany({
        where: {
          createdById: input.createdById
        },
        data: {
          isRead: input.isRead
        }
      })
    }),
  toggleSingleReadDirectMessage: protectedProcedure
    .input(z.object({ id: z.string(), isRead: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.directMessage.updateMany({
        where: {
          id: input.id
        },
        data: {
          isRead: input.isRead
        }
      })
    }),


})