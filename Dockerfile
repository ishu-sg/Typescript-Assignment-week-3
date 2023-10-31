FROM node:18-alpine 
COPY . /ts-assignment3
WORKDIR /ts-assignment3
EXPOSE 4000
CMD ["npm","run","watch"]