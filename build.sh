#! /bin/bash

export dir=dist
if [[ ! -e $dir ]]; then
    mkdir $dir
elif [[ ! -d $dir ]]; then
    echo "$dir already exists but is not a directory" 1>&2
fi

rm -rf ./dist/*

tsc

#cp -r ./types ./dist/
#cp -r ./src ./dist/src/
cp README.md ./dist/
cp package.json ./dist/