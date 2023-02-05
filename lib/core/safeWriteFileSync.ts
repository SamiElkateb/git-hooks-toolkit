import prompt = require('prompt');
import path = require('path');
import { z } from 'zod';
import { existsSync, writeFileSync } from 'fs';
import pathValidationSchema from '../models/path';

const getAbsolutePathFrom = (originPath: string) => (filePath: string) => {
  const parsedPath = pathValidationSchema.parse(filePath);
  if (path.isAbsolute(parsedPath)) return parsedPath;
  return path.resolve(originPath, parsedPath);
};

const safeWriteFileSync = async (filePath: string, content: string) => {
  const getAbsolutePathTo = getAbsolutePathFrom(process.cwd());
  const absolutePath = getAbsolutePathTo(filePath);
  if (existsSync(absolutePath)) {
    const question = `${filePath} already exists. Do you want to overwrite it ? (Y/n)?`;
    prompt.start();
    const { value } = await prompt.get([
      {
        description: question,
        name: 'value',
        required: true,
      },
    ]);
    const validatedValue = z.string().safeParse(value);
    if (!validatedValue.success) {
      await safeWriteFileSync(filePath, content);
      return;
    }
    if (validatedValue.data.match(/^(n|no)$/i)) {
      return;
    }
    if (!validatedValue.data.match(/^(Y|Yes|yes)$/)) {
      await safeWriteFileSync(filePath, content);
      return;
    }
  }
  writeFileSync(absolutePath, content);
};

export { getAbsolutePathFrom, safeWriteFileSync };
