import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
} from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
    editUserInfo: protectedProcedure
        .input(z.object({ bio: z.string().min(1).max(200), isPrivateAccount: z.boolean() }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.user.update({
                where: {
                    id: ctx.session.user.id,
                },
                data: {
                    bio: input.bio,
                    isPrivateAccount: input.isPrivateAccount
                }
            })
        }),
    getBio: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            return ctx.db.user.findUnique({
                where: {
                    id: input.id
                },
                select: { bio: true }
            })
        }),
    searchPublicUsers: protectedProcedure
        .input(z.object({ username: z.string() }))
        .query(async ({ ctx, input }) => {
            return ctx.db.user.findMany({
                take: 10,
                where: {
                    username: {
                        contains: input.username,
                    },
                }
            })
        }),
    toggleFollowUser: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {

            const userToFollow = await ctx.db.user.findUnique({
                where: {
                    id: input.id,
                },
            })
            const sessionUser = await ctx.db.user.findUnique({
                where: {
                    id: ctx.session.user.id,
                },
            })
            if (!userToFollow || !sessionUser) return

            const sessionUserFollowedUsers = sessionUser.followedUsers

            const userIsFollowed = sessionUserFollowedUsers.includes(userToFollow.id)

            let pendingUserData;
            let sessionUserData;

            if (!userIsFollowed) {
                sessionUserData = await ctx.db.user.update({
                    where: {
                        id: ctx.session.user.id
                    },
                    data: {
                        followedUsers: {
                            push: userToFollow.id
                        }
                    }
                })
                pendingUserData = await ctx.db.user.update({
                    where: { id: input.id },
                    data: { followers: { push: ctx.session.user.id } }
                })
                return [sessionUserData, pendingUserData]

            } else {
                sessionUserData = await ctx.db.user.update({
                    where: {
                        id: ctx.session.user.id
                    },
                    data: {
                        followedUsers:
                            sessionUserFollowedUsers.filter(id => id !== userToFollow.id)
                    }
                })
                pendingUserData = await ctx.db.user.update({
                    where: { id: input.id },
                    ///fix later
                    data: { followers: userToFollow.followers.filter(id => id !== ctx.session.user.id) }
                })
            }
            return [sessionUserData, pendingUserData]
        }),
    togglePendingUser: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {

            const pendingFollowUser = await ctx.db.user.findUnique({
                where: { id: input.id },
            })

            const sessionUser = await ctx.db.user.findUnique({
                where: {
                    id: ctx.session.user.id,
                },
            })

            if (!sessionUser || !pendingFollowUser) return

            const pendingUserPendingFollowers = pendingFollowUser.pendingFollowers
            const sessionUserPendingFollows = sessionUser.pendingFollows

            const userToPendingFollow = sessionUserPendingFollows.includes(input.id)

            let pendingUserData;
            let sessionUserData;

            if (!userToPendingFollow) {
                pendingUserData = await ctx.db.user.update({
                    where: {
                        id: input.id
                    },
                    data: {
                        pendingFollows: {
                            push: pendingFollowUser.id
                        }
                    }
                })

                sessionUserData = await ctx.db.user.update({
                    where: { id: ctx.session.user.id },
                    data: { pendingFollowers: { push: input.id } }
                })
            } else {
                sessionUserData = await ctx.db.user.update({
                    where: {
                        id: ctx.session.user.id
                    },
                    data: {
                        pendingFollows: sessionUserPendingFollows.filter(id => id !== input.id)
                    }
                })
                pendingUserData = await ctx.db.user.update({
                    where: { id: input.id },
                    data: { pendingFollowers: pendingUserPendingFollowers.filter(id => id !== ctx.session.user.id) }
                })
            }
            return [sessionUserData, pendingUserData]
        }),

    acceptUserFollow: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {

            const sessionUser = await ctx.db.user.findUnique({
                where: {
                    id: ctx.session.user.id,
                },
            })
            const pendingUser = await ctx.db.user.findUnique({
                where: {
                    id: input.id,
                },
            })

            if (!pendingUser || !sessionUser) return

            const pendingUserFollows = pendingUser.pendingFollows
            const sessionUserFollowers = sessionUser.pendingFollowers

            const accepedFollower = ctx.db.user.update({
                where: {
                    id: input.id
                },
                data: {
                    followedUsers: {
                        push: ctx.session.user.id
                    },
                    pendingFollows: pendingUserFollows.filter(id => id !== ctx.session.user.id)
                }
            })

            const updatedSessionUser =
                ctx.db.user.update({
                    where: {
                        id: input.id
                    },
                    data: {
                        followers: { push: input.id },
                        pendingFollowers: sessionUserFollowers.filter(id => id !== input.id)
                    }
                })
            return [accepedFollower, updatedSessionUser]
        }),
    getProfile: protectedProcedure
        .input(z.object({ id: z.string().optional(), username: z.string().optional() }))
        .query(async ({ ctx, input }) => {



            if (input.username) {
                return  ctx.db.user.findUnique({
                    where: {
                        username: input.username,
                    },
                    include: {
                        posts: {
                            orderBy: {
                                createdAt: 'desc'
                            }
                        },
                    }
                })

            }

            else if (input.id) {
                return  ctx.db.user.findUnique({
                    where: {
                        id: input.id,
                    },
                    include: {
                        posts: {
                            orderBy: {
                                createdAt: 'desc'
                            }
                        },
                    }
                })
            } else {
                return null
            }
            // if (!profile?.followedUsers.includes(ctx.session.user.id) && profile?.isPrivateAccount) {
            //     return null
            // } else {
            //     return profile
            // }
        }),
})