import { z } from 'zod';

const NOT_WIRED = /Command failed: git config --unset core.hooksPath/;
const NOT_WIRED_MSG = 'Your git config is not wired to Git Hooks Toolkit.\nAre your sure you are in the correct directory?';

const INSTALL_NOT_FOUND = /install\.sh ENOENT/;
const INSTALL_NOT_FOUND_MSG = 'Git Hooks Toolkit could not be wired.\nGit Hooks Toolkit does not seem to be installed.\nAre your sure that you are in the correct directory?';
const UNINSTALL_NOT_FOUND = /uninstall\.sh ENOENT/;
const UNINSTALL_NOT_FOUND_MSG = 'Git Hooks Toolkit could not be uninstalled.\nGit Hooks Toolkit does not seem to be installed.\nAre your sure that you are in the correct directory?';

const updateMessage = (message: string) => {
  if (message.match(NOT_WIRED)) return NOT_WIRED_MSG;
  if (message.match(UNINSTALL_NOT_FOUND)) return UNINSTALL_NOT_FOUND_MSG;
  if (message.match(INSTALL_NOT_FOUND)) return INSTALL_NOT_FOUND_MSG;
  return message;
};

export default async (data: unknown) => {
  const awaitedData = await data;
  const message = z.object({
    message: z.string(),
    success: z.boolean(),
  }).safeParse(awaitedData);
  if (message.success) {
    return {
      ...message.data,
      message: updateMessage(message.data.message),
    };
  }
  return data;
};
