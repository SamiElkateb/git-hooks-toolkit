#!/bin/bash

file_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" || exit; pwd -P )
dir_name=${file_path##*/}/hooks

git config core.hooksPath $dir_name

for FILE in $file_path/hooks/* ; do chmod +x $FILE; done

exit 0