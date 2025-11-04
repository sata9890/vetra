import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create demo users
  const user1 = await prisma.user.upsert({
    where: { email: 'alice@vetra.app' },
    update: {},
    create: {
      email: 'alice@vetra.app',
      name: 'Alice Chen',
      handle: 'alice',
      bio: 'Full-stack developer passionate about AI and open source',
      isVetted: true,
      trustScore: 150,
    },
  })

  const user2 = await prisma.user.upsert({
    where: { email: 'bob@vetra.app' },
    update: {},
    create: {
      email: 'bob@vetra.app',
      name: 'Bob Smith',
      handle: 'bob',
      bio: 'Product designer and UX enthusiast',
      isVetted: false,
      trustScore: 0,
    },
  })

  console.log('✅ Created users:', { user1: user1.email, user2: user2.email })

  // Create skills
  const reactSkill = await prisma.skill.upsert({
    where: { name: 'React' },
    update: {},
    create: { name: 'React', category: 'Frontend' },
  })

  const nodeSkill = await prisma.skill.upsert({
    where: { name: 'Node.js' },
    update: {},
    create: { name: 'Node.js', category: 'Backend' },
  })

  const designSkill = await prisma.skill.upsert({
    where: { name: 'UI Design' },
    update: {},
    create: { name: 'UI Design', category: 'Design' },
  })

  console.log('✅ Created skills')

  // Add skills to users
  await prisma.userSkill.createMany({
    data: [
      { userId: user1.id, skillId: reactSkill.id, expertiseLevel: 'Expert' },
      { userId: user1.id, skillId: nodeSkill.id, expertiseLevel: 'Expert' },
      { userId: user2.id, skillId: designSkill.id, expertiseLevel: 'Expert' },
    ],
    skipDuplicates: true,
  })

  console.log('✅ Added skills to users')

  // Create projects
  const project1 = await prisma.project.create({
    data: {
      ownerId: user1.id,
      title: 'AI Task Manager',
      description: 'An intelligent task management app powered by AI',
      tags: JSON.stringify(['AI', 'React', 'Node.js', 'Open Source']),
      status: 'Open',
      visibility: 'PUBLIC',
    },
  })

  const project2 = await prisma.project.create({
    data: {
      ownerId: user1.id,
      title: 'Design System',
      description: 'A comprehensive design system for modern web apps',
      tags: JSON.stringify(['Design', 'UI', 'Components']),
      status: 'In Progress',
      visibility: 'PUBLIC',
    },
  })

  console.log('✅ Created projects')

  // Add project members
  await prisma.projectMember.createMany({
    data: [
      { projectId: project1.id, userId: user1.id, role: 'Owner' },
      { projectId: project1.id, userId: user2.id, role: 'Member' },
      { projectId: project2.id, userId: user1.id, role: 'Owner' },
    ],
    skipDuplicates: true,
  })

  console.log('✅ Added project members')

  // Create posts
  await prisma.post.createMany({
    data: [
      {
        userId: user1.id,
        content: 'Just launched the first version of our AI Task Manager! Check it out and let us know what you think.',
        tags: JSON.stringify(['AI', 'Launch']),
      },
      {
        userId: user2.id,
        content: 'Looking for experienced React developers to join our design system project. DM if interested!',
        tags: JSON.stringify(['React', 'Hiring']),
      },
      {
        userId: user1.id,
        content: 'What\'s your favorite way to handle state management in React? Curious to hear from the community.',
        tags: JSON.stringify(['React', 'Discussion']),
      },
    ],
  })

  console.log('✅ Created posts')

  // Create endorsements
  await prisma.endorsement.create({
    data: {
      endorserId: user2.id,
      endorseeId: user1.id,
      skillId: reactSkill.id,
    },
  })

  console.log('✅ Created endorsements')

  // Create vetting application
  await prisma.vettingApplication.create({
    data: {
      userId: user2.id,
      summaryText: 'Experienced product designer with 5+ years in tech startups',
      evidenceLink: 'https://portfolio.example.com',
      status: 'Pending',
    },
  })

  console.log('✅ Created vetting application')

  console.log('🎉 Database seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
