import { z } from 'zod';

export const initSchema = z.object({
  init: z
    .string({
      required_error: 'init argument is required',
      invalid_type_error: 'init argument must be a string',
    })
    .regex(/^(maven|npm)$/, 'choose your installation template (maven or npm)'),
});

export const wireSchema = z.object({
  wire: z.boolean(),
});

export const unwireSchema = z.object({
  unwire: z.boolean(),
});

export const uninstallSchema = z.object({
  uninstall: z.boolean(),
});
