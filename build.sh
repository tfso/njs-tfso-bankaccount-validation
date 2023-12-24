#! /bin/bash

export dir=dist
if [[ ! -e $dir ]]; then
    mkdir $dir
elif [[ ! -d $dir ]]; then
    echo "$dir already exists but is not a directory" 1>&2
fi

tsc

rm -rf ./dist/*
cp -r ./build/. ./dist/.
cp README.md ./dist/
cp package.json ./dist/
rm -rf ./dist/test