#!/bin/bash

url=$1
imageName=$2

wget $url -O public/images/$imageName
