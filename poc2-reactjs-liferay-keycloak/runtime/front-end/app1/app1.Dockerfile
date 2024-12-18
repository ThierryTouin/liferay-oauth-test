## Stage 1: Build Image
FROM node:22-alpine AS build

ARG TITLE 

WORKDIR /app

RUN mkdir -p ./common-modules
WORKDIR /app/common-modules
COPY ../common-modules/package*.json ./
RUN npm cache clear --force
RUN npm install --verbose
COPY ../common-modules .
RUN npm run build

RUN mkdir -p ./app1/react-app
WORKDIR /app/app1/react-app
COPY ./app1/react-app/package*.json ./
RUN npm install --verbose
COPY ./app1/react-app .
RUN REACT_APP_TITLE=${TITLE} \
    npm run build

## Stage 2, use the compiled app, ready for production with Nginx
FROM nginx:1.21.6-alpine
COPY --from=build /app/app1/react-app/build /usr/share/nginx/html
COPY ./app1/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80 
CMD ["nginx", "-g", "daemon off;"]