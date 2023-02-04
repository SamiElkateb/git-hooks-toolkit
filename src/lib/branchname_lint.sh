#!/bin/bash

function branchname_lint {
    BRANCH_NAME="$(git rev-parse --abbrev-ref HEAD)"
    PATTERN="$1"
    if ! [[ "$BRANCH_NAME" =~ $PATTERN ]]; then
      error_log "$2"
      exit 1
    fi
}