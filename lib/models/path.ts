import { z } from 'zod';

export default z
  .string({
    required_error: 'path is required',
    invalid_type_error: 'path must be a string',
  })
  .regex(/^(\.{1,2}\/)?(\/|\w|_|-|\.)+$/, 'path does not seem valid');
