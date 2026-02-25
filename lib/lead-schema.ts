import { z } from "zod";

export const leadGoals = ["oge", "ege", "olympiad", "other"] as const;
export const leadFormats = ["individual", "group"] as const;
export const leadRequestTypes = ["lesson", "consultation"] as const;

const contactPattern =
  /^(?:\+?\d[\d\s()\-]{6,}|@[a-zA-Z0-9_]{5,}|https?:\/\/t\.me\/[a-zA-Z0-9_]{5,})$/;

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Укажите имя").max(80, "Слишком длинное имя"),
  contact: z
    .string()
    .trim()
    .min(5, "Укажите контакт")
    .max(120, "Слишком длинный контакт")
    .regex(contactPattern, "Введите телефон или Telegram"),
  goal: z.enum(leadGoals),
  format: z.enum(leadFormats),
  requestType: z.enum(leadRequestTypes),
  comment: z
    .string()
    .trim()
    .max(500, "Комментарий слишком длинный")
    .optional()
    .or(z.literal("")),
  consent: z.literal(true),
  source: z.string().trim().min(2).max(100),
  company: z.string().trim().max(200).optional().default(""),
  idempotencyKey: z.string().trim().min(10).max(120),
});

export type LeadPayload = z.infer<typeof leadSchema>;
