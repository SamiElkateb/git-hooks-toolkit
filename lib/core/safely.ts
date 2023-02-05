import { z } from 'zod';

export default async (callback: CallableFunction) => {
  try {
    await callback();
    return {
      success: true,
    };
  } catch (error: unknown) {
    const message = z.object({
      message: z.string(),
    }).safeParse(error);
    return {
      success: false,
      message: message.success ? message.data.message : 'Unknown error',
    };
  }
};
