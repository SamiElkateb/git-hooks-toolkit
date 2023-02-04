#!/bin/bash

function run_command {
    cmd_exit_code=0
    eval $1
    cmd_exit_code=$?
    if [ $cmd_exit_code -ne 0 ]
    then
      exit 1
    fi
}