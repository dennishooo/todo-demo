import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const dennis = await prisma.user.upsert({
    where: { username: 'dennis' },
    update: {},
    create: {
      username: 'dennis',
      password: '$2b$10$XvmflQJYYydiiDWsN4CObOQ7.wjZb5gjdUd0Lw2oR189I7y38hhT6',
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
