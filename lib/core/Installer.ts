import { readFileSync, chmodSync, mkdirSync } from 'fs';
import { execFileSync, execSync } from 'child_process';
import { getAbsolutePathFrom, safeWriteFileSync } from './safeWriteFileSync';

const filesToCopy = [
  'install.sh',
  'imports.sh',
  'uninstall.sh',
  'lib/branchname_lint.sh',
  'lib/commit_lint.sh',
  'lib/filename_lint.sh',
  'lib/logger.sh',
  'lib/no_commit_to.sh',
  'lib/parse_yaml.sh',
  'lib/run_command.sh',
  'hooks/commit-msg',
  'hooks/pre-commit',
  'hooks/pre-push',
].map((file) => `.git-hooks-toolkit/${file}`);

const filesToMakeExec = ['install.sh', 'uninstall.sh'].map(
  (file) => `.git-hooks-toolkit/${file}`,
);

class Installer {
  static init = async (template: string) => {
    mkdirSync('./.git-hooks-toolkit/hooks', { recursive: true });
    mkdirSync('./.git-hooks-toolkit/lib', { recursive: true });
    const getAbsoluteOriginPath = getAbsolutePathFrom(__dirname);
    const getAbsoluteDestinationPath = getAbsolutePathFrom(process.cwd());
    for (let i = 0; i < filesToCopy.length; i += 1) {
      const filepath = filesToCopy[i];
      const originPath = getAbsoluteOriginPath(`../../${filepath}`);
      const fileContent = readFileSync(originPath, 'utf8');
      const destinationPath = getAbsoluteDestinationPath(filepath);
      // eslint-disable-next-line no-await-in-loop
      await safeWriteFileSync(destinationPath, fileContent);
    }
    {
      const originPath = getAbsoluteOriginPath(`../../templates/${template}.yml`);
      const fileContent = readFileSync(originPath, 'utf8');
      const destinationPath = getAbsoluteDestinationPath('./git-hooks.yml');
      await safeWriteFileSync(destinationPath, fileContent);
    }
    for (let i = 0; i < filesToMakeExec.length; i += 1) {
      const filepath = filesToMakeExec[i];
      const destinationPath = getAbsoluteDestinationPath(filepath);
      chmodSync(destinationPath, 0o755);
    }
    const installScriptPath = getAbsoluteDestinationPath('./.git-hooks-toolkit/install.sh');
    execFileSync(installScriptPath);
  };

  static uninstall = async () => {
    const getAbsoluteDestinationPath = getAbsolutePathFrom(process.cwd());
    const uninstallScriptPath = getAbsoluteDestinationPath('./.git-hooks-toolkit/uninstall.sh');
    execFileSync(uninstallScriptPath);
  };

  static wire = async () => {
    const getAbsoluteDestinationPath = getAbsolutePathFrom(process.cwd());
    const installScriptPath = getAbsoluteDestinationPath('./.git-hooks-toolkit/install.sh');
    execFileSync(installScriptPath);
  };

  static unwire = async () => {
    execSync('git config --unset core.hooksPath');
  };
}

export default Installer;
