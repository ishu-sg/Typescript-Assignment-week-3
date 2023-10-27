# #FROM node:lts-buster
# # Install node dependencies and sync folders

# FROM public.ecr.aws/sg/node:18-alpine as build
# COPY . /var/app/ts-bp-be

# WORKDIR /var/app/ts-bp-be
# RUN npm install


# to get the image of a package we want to work on eg. node,mongodb.
FROM node:14.17.0-buster as build

# copy {source} to {dest}
# this cmd will copy all the files from source directory to dest directorty in image.
COPY . /application

# now set this new directory as our default working dir.
WORKDIR /application

#Install dependencies 
RUN npm install