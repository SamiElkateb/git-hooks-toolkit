#!/bin/bash

function commit_lint {
    PATTERN="$1"
    if ! [[ "$COMMIT_MSG" =~ $PATTERN ]]; then
      error_log "$2"
      exit 1
    fi
}