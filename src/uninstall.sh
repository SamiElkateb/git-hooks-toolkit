#!/bin/bash

file_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" || exit; pwd -P )
project_folder="$(git rev-parse --show-toplevel)"

function delete_config {
    if test -f "$file_path/git-hooks.yml"; then
        rm "$file_path/git-hooks.yml"
        return
    fi

    if test -f "$file_path/git-hooks.yaml"; then
        rm "$file_path/git-hooks.yaml"
        return
    fi

    if test -f "$project_folder/git-hooks.yaml"; then
        rm "$project_folder/git-hooks.yaml"
        return
    fi

    if test -f "$project_folder/git-hooks.yml"; then
        rm "$project_folder/git-hooks.yml"
        return
    fi
}

delete_config
git config --unset core.hooksPath
rm -rf "$file_path"

exit 0