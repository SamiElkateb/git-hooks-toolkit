# Git Hooks Toolkit

Git Hooks Toolkit is a lightweight library to simplify the use of git hooks in a collaborative workflow.  
Git Hooks Toolkit can be used on any git repository and comes with a few added features like branch name, file name and commit message linting.

## Installation

### Manual installation

Download the src folder, rename it to `.git-hooks-toolkit` and place it in your project.
Then run the installation script `install.sh`.
The installation script needs to be run on each local project.

## Usage

To configure different scripts to be run you need to place a `git-hooks.yml` in the `.git-hooks-toolkit` folder or at the root of your project. You can find configuration templates in the templates folder.

To bypass the hooks for a specific commit add `--no-verify` to your git command.
Example: `git commit -m 'yolo' --no-verify`  
More information on which git command support the `--no-verify` argument on [Git](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)
### Set a pre-commit hook

```yaml
pre_commit: npm run lint && npm run test
```

> The pre-commit hook is run first, before you even type in a commit message. It’s used to inspect the snapshot that’s about to be committed, to see if you’ve forgotten something, to make sure tests run, or to examine whatever you need to inspect in the code. [Git](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)


### Set a pre-push hook
```yaml
pre_push: npm run lint && npm run test
```
> The pre-push hook runs during git push, after the remote refs have been updated but before any objects have been transferred. You can use it to validate a set of ref updates before a push occurs. [Git](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)


### Prevent commits to branches
```yaml
no_commit_to: 
  branches:
    - master
    - develop
  message: 'Committing to the following branches is not allowed : master, develop'
```

### Lint branch names
```yaml
branchname_lint:
  regex: '^(develop|main|master|((feature|hotfix)/[a-zA-Z0-9\_]+))$'
  message: 'Commit aborted: branch name does not follow naming convention.'
```

### Lint file names
```yaml
filename_lint: 
  regex: '^[a-zA-Z\_\.\-]+$'
  message: 'Non-alphanumeric file names are not allowed.'
```

### Lint commit messages
```yaml
commit_lint: 
  regex: '^(add|fix|remove): .*'
  message: 'Commit message must contain a verb (ex: \"add: awesome feature\").'
```

## Uninstall

To completely remove git-hooks-toolkit run the script `uninstall.sh`.

To disable your custom git hooks in the current git repository but keep the git-hooks-toolkit config run the command `git config --unset core.hooksPath`.

## Alternatives

Husky: https://github.com/typicode/husky

Pre-commit: https://github.com/pre-commit/pre-commit
