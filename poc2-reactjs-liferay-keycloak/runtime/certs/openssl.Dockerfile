FROM alpine:3.15.4 AS build

WORKDIR /cert

RUN apk --no-cache add curl openssl

CMD ["/usr/local/bin/openssl"]
