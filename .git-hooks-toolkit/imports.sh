#!/bin/bash

file_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" || exit; pwd -P )
project_folder="$(git rev-parse --show-toplevel)"

for FILE in $file_path/lib/* ; do source $FILE ; done

function import_config {
    if test -f "$file_path/git-hooks.yml"; then
        eval $(parse_yaml "$file_path/git-hooks.yml";)
        return
    fi

    if test -f "$file_path/git-hooks.yaml"; then
        eval $(parse_yaml "$file_path/git-hooks.yaml";)
        return
    fi

    if test -f "$project_folder/git-hooks.yaml"; then
        eval $(parse_yaml  "$project_folder/git-hooks.yaml")
        return
    fi

    if test -f "$project_folder/git-hooks.yml"; then
        eval $(parse_yaml  "$project_folder/git-hooks.yml")
        return
    fi
}
import_config &> /dev/null