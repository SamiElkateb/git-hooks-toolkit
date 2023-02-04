#!/bin/bash

function no_commit_to_branch {
    BRANCH_NAME="$(git rev-parse --abbrev-ref HEAD)"

    BRANCHES="$no_commit_to_branch;$no_commit_to_branches_1;$no_commit_to_branches_2;$no_commit_to_branches_3;$no_commit_to_branches_4;$no_commit_to_branches_5;$no_commit_to_branches_6;$no_commit_to_branches_7;$no_commit_to_branches_8;$no_commit_to_branches_9;$no_commit_to_branches_10"

    for FORBIDDEN_BRANCH in $(echo $BRANCHES | tr ";" "\n")
    do
        if	[[  $BRANCH_NAME =~ $FORBIDDEN_BRANCH ]]
        then
            error_log "$no_commit_to_message"
            exit 1
        fi
    done
}