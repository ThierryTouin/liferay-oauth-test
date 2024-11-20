## Stage 1: Build Image
FROM node:22-alpine AS build

ARG TITLE 

WORKDIR /app
COPY ./react-app/package*.json ./
RUN npm install
COPY ./react-app .

# react-app-rewired to personnalise webPack configuration
RUN npm install react-app-rewired --save-dev

RUN REACT_APP_TITLE=${TITLE} \
    npm run build

## Stage 2, use the compiled app, ready for production with Nginx
FROM nginx:1.21.6-alpine
COPY --from=build /app/build /usr/share/nginx/html 
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80 
CMD ["nginx", "-g", "daemon off;"]