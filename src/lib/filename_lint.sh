#!/bin/bash

function filename_lint {
    if git rev-parse --verify HEAD >/dev/null 2>&1
    then
        against=HEAD
    else
        against=$(git hash-object -t tree /dev/null)
    fi

    exec 1>&2

    IN="$(git diff --cached --name-only --diff-filter=A -z $against)" 
    for i in $(echo $IN | tr "^@" "\n")
    do
        filename=${i##*/} 
        if	! [[ $filename =~ $1  ]]
        then
            error_log "$2"
            exit 1
        fi
    done
}