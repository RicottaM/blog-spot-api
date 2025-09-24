import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.create({
    data: {
      login: 'admin',
      email: 'admin@example.com',
      passwordHash:
        '$2b$10$CwTycUXWue0Thq9StjUM0uJ8nE5Q6zF8pLzQ8OQZxkZ1uYQ8Q9O.G',
    },
  });

  console.log(`[CREATE] Created admin #${admin.id}`);

  const postTexts = [
    'First post on my blog! 🎉 Excited to start sharing my thoughts here.',
    'Lately I’ve been thinking a lot about productivity. It’s easy to fall into the trap of doing too much and ending up exhausted. What I’m learning is that true productivity is about choosing the right things to focus on, not about filling every minute with tasks. Balance really matters.',
    'Tried brewing coffee with cinnamon today — surprisingly good combination.',
    "I finally started reading 'Clean Code' by Robert C. Martin. It’s a book I’ve heard about for years, and now I understand why it’s so highly recommended. The emphasis on writing code for humans, not just for machines, is something I want to keep practicing in every project.",
    'Morning run completed: 5 km in the park. Tired but feeling accomplished.',
    'A friend introduced me to meditation apps recently, and I gave it a try. Just ten minutes of breathing and silence made a huge difference in how I felt for the rest of the day. It’s strange how simple things can have such a strong impact on our mental health.',
    "Watched 'Inception' last night. Still can’t stop thinking about that ending…",
    'Over the weekend I worked on a side project: a small API built with NestJS and Prisma. What surprised me most was how quickly I could set up a fully functional CRUD. Compared to past experiences, the developer experience here is just miles better. Definitely a stack I’ll use again.',
    'Note to self: put the phone down more often and just read a book 📚.',
    'Today was rough. Too many meetings, too little actual progress. But I’m learning that not every day will feel productive — and that’s okay. Sometimes it’s just about showing up and keeping momentum, even when it feels slow.',
    'Installed NestJS + Prisma. First impressions? Super intuitive and fast!',
    'I love autumn. 🍂 The weather is cooler, the leaves are beautiful, and there’s something calming about this season. Perfect time to stay inside with a good book or spend a quiet evening coding.',
    'Cloudy day today, but a quiet walk in the forest cleared my head.',
    'I’ve been experimenting with different note-taking apps. Right now I’m trying Obsidian, and it feels like a game changer. The idea of linking thoughts like a graph instead of just linear notes really resonates with me.',
    'Experimenting with writing daily blog posts — let’s see if I can stick to it.',
    'Watched a documentary about minimalism today. The main point was clear: less stuff, more focus. It made me want to declutter my desk and digital life. Too much noise makes it hard to see what actually matters.',
    'Finished a TypeScript course today. Definitely worth the effort!',
    'Learning PostgreSQL has been a journey. At first it felt intimidating, but once I got comfortable with joins, indexes, and transactions, I realized how powerful it is. Pairing it with Prisma makes database work feel almost effortless.',
    'Ending the day with tea, calm music, and a bit of planning for tomorrow ☕🎶.',
    'Sunday evening. Just writing here to reflect on the week. Ups and downs, but I’m grateful for small wins: a good run, some time with friends, and progress on my side project. Sometimes it’s the little things that make the biggest difference.',
  ];

  for (const postText of postTexts) {
    const post = await prisma.post.create({
      data: {
        text: postText,
        authorId: admin.id,
      },
    });

    console.log(`[CREATE] Created post #${post.id}`);
  }
}

main()
  .catch((error) => {
    console.error(`[ERROR]: ${error.message}`);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
