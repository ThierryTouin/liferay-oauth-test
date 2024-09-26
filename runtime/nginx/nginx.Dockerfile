FROM nginx:1.21.6-alpine

COPY ./nginx/keycloak.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]