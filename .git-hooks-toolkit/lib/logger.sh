#!/bin/bash

RED="\033[1;31m"
GREEN="\033[1;32m"
NC="\033[0m"

function error_log {
    printf "${RED} ❌ $1 ${NC}"
}

function log {
    printf "${NC} $1"
}

function success_log {
    printf "${GREEN} $1 ${NC}"
}