import { z } from 'zod';

export default async (data: unknown) => {
  const awaitedData = await data;

  const message = z.object({
    message: z.string(),
    success: z.boolean(),
  }).safeParse(awaitedData);
  if (message.success && !message.data.success) {
    // eslint-disable-next-line no-console
    console.log(message.data.message);
  }
};
