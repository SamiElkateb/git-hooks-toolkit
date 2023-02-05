#! /usr/bin/env node
/* eslint-disable @typescript-eslint/no-floating-promises */

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import {
  initSchema, uninstallSchema, wireSchema, unwireSchema,
} from '../models/args';
import Installer from '../core/Installer';
import safely from '../core/safely';
import withLogs from '../core/withLogs';
import withExplicitMessages from '../core/withExplicitMessages';

const initDescription = `Initializes git-hooks-toolkit by creating the necessary files and a config template at the root of the project:
- 1 git-hooks-toolkit.yml config file
- 1 .git-hooks-toolkit folder containing config files
`;

const wireDescription = 'Initializes git-hooks-toolkit on a new computer in a repository where the config files are already present';

const unwireDescription = 'Disables your custom git hooks in the current git repository but keeps the git-hooks-toolkit files and folders';

const uninstallDescription = 'Completely deletes git-hooks-toolkit and all associated files and configuration';

const yarg = yargs(hideBin(process.argv))
  .usage('Usage: (npx|npm) $0 [options]')
  .options({
    i: {
      alias: 'init',
      describe: initDescription,
      type: 'string',
    },
  })
  .options({
    w: {
      alias: 'wire',
      describe: wireDescription,
      type: 'boolean',
    },
  })
  .options({
    unwire: {
      describe: unwireDescription,
      type: 'boolean',
    },
  })
  .options({
    u: {
      alias: 'uninstall',
      describe: uninstallDescription,
      type: 'boolean',
    },
  })
  .example('$0 --init=npm', 'Initializes git-hooks-toolkit with the npm template')
  .example('$0 --init=maven', 'Initializes git-hooks-toolkit with the maven template')
  .alias('v', 'version')
  .version('0.0.1')
  .help('h')
  .alias('h', 'help')
  .strict()
  .strictOptions()
  .wrap(null);

const init = initSchema.safeParse(yarg.argv);
const wire = wireSchema.safeParse(yarg.argv);
const uninstall = uninstallSchema.safeParse(yarg.argv);
const unwire = unwireSchema.safeParse(yarg.argv);
if (init.success) {
  withLogs(withExplicitMessages(safely(Installer.init.bind(this, init.data.init))));
} else if (wire.success) {
  withLogs(withExplicitMessages(safely(Installer.wire)));
} else if (uninstall.success) {
  withLogs(withExplicitMessages(safely(Installer.uninstall)));
} else if (unwire.success) {
  withLogs(withExplicitMessages(safely(Installer.unwire)));
} else {
  yarg.showHelp();
}
