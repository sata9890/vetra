import { router, publicProcedure, protectedProcedure } from './trpc'
import { z } from 'zod'
import { TRPCError } from '@trpc/server'

// Auth Router
const authRouter = router({
  me: publicProcedure.query(({ ctx }) => {
    return ctx.session?.user || null
  }),
  
  logout: protectedProcedure.mutation(() => {
    // NextAuth handles logout via signOut() on client
    return { success: true }
  }),
})

// Profile Router
const profileRouter = router({
  getProfile: publicProcedure
    .input(z.object({ handle: z.string() }))
    .query(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { handle: input.handle },
        include: {
          skills: { include: { skill: true } },
          credentials: true,
          endorsementsReceived: { include: { endorser: true, skill: true } },
        },
      })
      
      if (!user) {
        throw new TRPCError({ code: 'NOT_FOUND' })
      }
      
      return user
    }),

  updateProfile: protectedProcedure
    .input(z.object({
      name: z.string().optional(),
      bio: z.string().optional(),
      image: z.string().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.user.update({
        where: { id: (ctx.session.user as any).id },
        data: input,
      })
    }),

  addSkill: protectedProcedure
    .input(z.object({
      skillName: z.string(),
      expertiseLevel: z.enum(['Beginner', 'Intermediate', 'Expert']),
    }))
    .mutation(async ({ input, ctx }) => {
      let skill = await ctx.prisma.skill.findUnique({
        where: { name: input.skillName },
      })
      
      if (!skill) {
        skill = await ctx.prisma.skill.create({
          data: { name: input.skillName },
        })
      }
      
      return await ctx.prisma.userSkill.create({
        data: {
          userId: (ctx.session.user as any).id,
          skillId: skill.id,
          expertiseLevel: input.expertiseLevel,
        },
      })
    }),
})

// Vetting Router
const vettingRouter = router({
  submitApplication: protectedProcedure
    .input(z.object({
      summaryText: z.string(),
      evidenceLink: z.string().url(),
    }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.vettingApplication.upsert({
        where: { userId: (ctx.session.user as any).id },
        create: {
          userId: (ctx.session.user as any).id,
          summaryText: input.summaryText,
          evidenceLink: input.evidenceLink,
        },
        update: {
          summaryText: input.summaryText,
          evidenceLink: input.evidenceLink,
          status: 'Pending',
        },
      })
    }),

  getApplications: protectedProcedure.query(async ({ ctx }) => {
    // Only admins can view all applications
    const user = await ctx.prisma.user.findUnique({
      where: { id: (ctx.session.user as any).id },
    })
    
    if (user?.trustScore! < 100) {
      throw new TRPCError({ code: 'FORBIDDEN' })
    }
    
    return await ctx.prisma.vettingApplication.findMany({
      where: { status: 'Pending' },
    })
  }),

  reviewApplication: protectedProcedure
    .input(z.object({
      applicationId: z.string(),
      status: z.enum(['Approved', 'Rejected']),
      reviewerNotes: z.string().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const app = await ctx.prisma.vettingApplication.update({
        where: { id: input.applicationId },
        data: {
          status: input.status,
          reviewedByUserId: (ctx.session.user as any).id,
          reviewedAt: new Date(),
          reviewerNotes: input.reviewerNotes,
        },
      })
      
      if (input.status === 'Approved') {
        await ctx.prisma.user.update({
          where: { id: app.userId },
          data: { isVetted: true, trustScore: { increment: 50 } },
        })
      }
      
      return app
    }),
})

// Projects Router
const projectsRouter = router({
  list: publicProcedure
    .input(z.object({
      status: z.string().optional(),
      limit: z.number().default(20),
      offset: z.number().default(0),
    }))
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.project.findMany({
        where: input.status ? { status: input.status } : {},
        include: { owner: true, members: true },
        take: input.limit,
        skip: input.offset,
        orderBy: { createdAt: 'desc' },
      })
    }),

  create: protectedProcedure
    .input(z.object({
      title: z.string(),
      description: z.string(),
      tags: z.array(z.string()),
      visibility: z.enum(['PUBLIC', 'MEMBERS', 'PRIVATE']).default('PUBLIC'),
    }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.project.create({
        data: {
          ownerId: (ctx.session.user as any).id,
          title: input.title,
          description: input.description,
          tags: JSON.stringify(input.tags),
          visibility: input.visibility,
        },
      })
    }),

  getDetails: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.project.findUnique({
        where: { id: input.id },
        include: {
          owner: true,
          members: { include: { user: true } },
          skills: { include: { skill: true } },
          threads: true,
        },
      })
    }),

  joinProject: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.projectMember.create({
        data: {
          projectId: input.projectId,
          userId: (ctx.session.user as any).id,
          role: 'Member',
        },
      })
    }),
})

// Posts Router
const postsRouter = router({
  list: publicProcedure
    .input(z.object({
      limit: z.number().default(20),
      offset: z.number().default(0),
    }))
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.post.findMany({
        include: { user: true, comments: true },
        take: input.limit,
        skip: input.offset,
        orderBy: { createdAt: 'desc' },
      })
    }),

  create: protectedProcedure
    .input(z.object({
      content: z.string(),
      tags: z.array(z.string()).optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.post.create({
        data: {
          userId: (ctx.session.user as any).id,
          content: input.content,
          tags: input.tags ? JSON.stringify(input.tags) : null,
        },
      })
    }),

  addComment: protectedProcedure
    .input(z.object({
      postId: z.string(),
      content: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.comment.create({
        data: {
          postId: input.postId,
          userId: (ctx.session.user as any).id,
          content: input.content,
        },
      })
    }),
})

// Billing Router
const billingRouter = router({
  getCredits: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: { id: (ctx.session.user as any).id },
    })
    return { credits: user?.credits || 0 }
  }),

  getTransactions: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.transaction.findMany({
      where: { userId: (ctx.session.user as any).id },
      orderBy: { createdAt: 'desc' },
    })
  }),
})

// Main Router
export const appRouter = router({
  auth: authRouter,
  profile: profileRouter,
  vetting: vettingRouter,
  projects: projectsRouter,
  posts: postsRouter,
  billing: billingRouter,
})

export type AppRouter = typeof appRouter
