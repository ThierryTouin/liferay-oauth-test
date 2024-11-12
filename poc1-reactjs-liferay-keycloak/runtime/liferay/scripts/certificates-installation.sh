#!/bin/bash

DOMAIN="sso.dev.local"
PORT=443

# Test if the server is reachable on the specified port
# if ! nc -z -w 5 $DOMAIN $PORT &> /dev/null
# then
    # echo -e "\033[31mError: $DOMAIN is not reachable on port $PORT\033[0m"
    # exit 1
# fi

mkdir -p $LIFERAY_HOME/certificates

SOURCE_PATH=$LIFERAY_HOME/certificates
CACERTS_ORIGIN_PATH=/usr/lib/jvm/zulu21/lib/security/cacerts
CACERTS_LIFERAY_PATH=$SOURCE_PATH/cacerts

echo "Copying the default keystore to a new path"

cp -f $CACERTS_ORIGIN_PATH $CACERTS_LIFERAY_PATH

openssl s_client -showcerts -connect $DOMAIN:$PORT < /dev/null | sed -n '/-----BEGIN CERTIFICATE-----/,/-----END CERTIFICATE-----/p' > $DOMAIN.crt
openssl x509 -in $DOMAIN.crt -out $DOMAIN.der -outform DER

keytool -import -alias $DOMAIN -keystore $CACERTS_LIFERAY_PATH -storepass changeit -file $DOMAIN.der -noprompt -trustcacerts 

keytool -list -v -keystore $CACERTS_LIFERAY_PATH -storepass changeit -alias $DOMAIN

rm $DOMAIN.crt
