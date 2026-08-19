import { z } from "zod";

const roomSchema = z.object({
  name: z.string().min(1),
  sleeps: z.number().int().positive(),
  ensuite: z.boolean(),
  priceFrom: z.number().int().positive(),
  features: z.array(z.string().min(1)),
});

const galleryImageSchema = z.object({
  src: z.string().startsWith("/images/"),
  alt: z.string().min(1),
});

export const propertySchema = z.object({
  name: z.string().min(1),
  town: z.string().min(1),
  county: z.string().min(1),
  summary: z.string().min(1),
  heroImage: z.string().startsWith("/images/"),
  heroImageAlt: z.string().min(1),
  checkIn: z.string().regex(/^\d{2}:\d{2}$/),
  checkOut: z.string().regex(/^\d{2}:\d{2}$/),
  wifi: z.boolean(),
  parking: z.boolean(),
  bookingUrl: z.url(),
  facilities: z.array(z.string().min(1)).min(1),
  rooms: z.array(roomSchema).min(1),
  gallery: z.array(galleryImageSchema).default([]),
  dogsAllowed: z.boolean().default(false),
});

export const articleSchema = z
  .object({
    title: z.string().min(1),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    author: z.string().min(1),
    excerpt: z.string().min(1),
    image: z.string().startsWith("/images/").optional(),
    imageAlt: z.string().min(1).optional(),
    tags: z.array(z.string().min(1)).default([]),
    draft: z.boolean().default(false),
  })
  .refine((article) => !article.image || Boolean(article.imageAlt), {
    message: "imageAlt is required when image is set",
    path: ["imageAlt"],
  });

export type Property = z.infer<typeof propertySchema>;
export type Article = z.infer<typeof articleSchema>;
export type Room = z.infer<typeof roomSchema>;
