import { z } from 'zod';

const contactSchema = z.object({
  email: z.string().email(),
  message: z.string().min(20),
});

export default defineEventHandler(async (event) => {
  const body = await readFormData(event);
  const parsed = contactSchema.safeParse(Object.fromEntries(body));
  if (!parsed.success) {
    setResponseStatus(event, 400);
    return parsed.error.format();
  }
  return true;
});
