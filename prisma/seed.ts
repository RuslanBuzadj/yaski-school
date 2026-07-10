import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { mockNews } from "../src/entities/news";
import { mockEvents } from "../src/entities/events";
import { mockStaff } from "../src/entities/staff";
import { mockGalleryAlbums } from "../src/entities/gallery";
import { aboutSections } from "../src/entities/school";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

function parseUkrainianDate(value: string): Date {
  const [day, month, year] = value.split(".").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

async function main() {
  await prisma.news.createMany({
    data: mockNews.map((news) => ({
      title: news.title,
      excerpt: news.excerpt,
      content: news.content,
      image: news.image,
      publishedAt: parseUkrainianDate(news.date),
    })),
  });

  await prisma.event.createMany({
    data: mockEvents.map((event) => ({
      title: event.title,
      excerpt: event.excerpt,
      content: event.content,
      image: event.image,
      date: parseUkrainianDate(event.date),
      time: event.time,
      location: event.location,
    })),
  });

  await prisma.staffMember.createMany({
    data: mockStaff.map((member) => ({
      name: member.name,
      role: member.role,
      group: member.group,
      image: member.image,
      category: member.category,
      education: member.education,
      experience: member.experience,
      subjects: member.subjects ?? [],
      bio: member.bio,
    })),
  });

  for (const album of mockGalleryAlbums) {
    await prisma.galleryAlbum.create({
      data: {
        title: album.title,
        description: album.description,
        cover: album.cover,
        images: {
          create: album.images.map((image, index) => ({
            src: image.src ?? "",
            caption: image.caption,
            order: index,
          })),
        },
      },
    });
  }

  await prisma.aboutSection.createMany({
    data: aboutSections.map((section, index) => ({
      slug: section.slug,
      title: section.title,
      content: section.content,
      order: index,
    })),
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
