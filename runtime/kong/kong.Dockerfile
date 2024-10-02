ARG BASE_IMAGE=kong/kong-gateway:3.6.0.0
FROM ${BASE_IMAGE}

LABEL authors="Thierry Touin <thierrytouin.pro@gmail.com>"
LABEL description="Alpine + Kong  + kong-oidc plugin"

USER root
RUN apt-get update && apt-get -y install unzip gcc
RUN luarocks install luaossl OPENSSL_DIR=/usr/local/kong CRYPTO_DIR=/usr/local/kong
RUN luarocks install --pin lua-resty-jwt
RUN luarocks install kong-oidc

USER kong