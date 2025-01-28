# Stage 1: Build React application
FROM node:18-alpine as build
WORKDIR /apps
COPY ../../sources/front-end ./front-end

# Installation of required packages
WORKDIR /apps/front-end
RUN npm install -g lerna@^8.1.9

RUN npm install --verbose

RUN npx lerna run build --stream

## Stage 2, use the compiled app, ready for production with Nginx
FROM nginx:1.21.6-alpine

# Copying files for app 1
COPY --from=build /apps/front-end/packages/app1/build /usr/share/nginx/html/app1

# Copying files for app 1
COPY --from=build /apps/front-end/packages/app2/build /usr/share/nginx/html/app2

# Copying nginx configuration file
COPY ./runtime/apps/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./runtime/apps/nginx/conf.d /etc/nginx/conf.d

EXPOSE 80 
CMD ["nginx", "-g", "daemon off;"]