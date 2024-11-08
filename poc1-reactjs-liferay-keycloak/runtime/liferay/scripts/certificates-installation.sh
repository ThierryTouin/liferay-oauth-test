#!/bin/bash

DOMAIN="sso.dev.local"

mkdir -p $LIFERAY_HOME/certificates

SOURCE_PATH=$LIFERAY_HOME/certificates
CACERTS_ORIGIN_PATH=/usr/lib/jvm/zulu21/lib/security/cacerts
CACERTS_LIFERAY_PATH=$SOURCE_PATH/cacerts

echo "Copying the default keystore to a new path"

cp -f $CACERTS_ORIGIN_PATH $CACERTS_LIFERAY_PATH

openssl s_client -showcerts -connect $DOMAIN:443 < /dev/null | sed -n '/-----BEGIN CERTIFICATE-----/,/-----END CERTIFICATE-----/p' > $DOMAIN.crt
openssl x509 -in $DOMAIN.crt -out $DOMAIN.der -outform DER

#keytool -delete -noprompt -alias $DOMAIN -keystore $CACERTS_LIFERAY_PATH -storepass changeit

#keytool -import -alias $DOMAIN -keystore $CACERTS_LIFERAY_PATH -storepass changeit -file $DOMAIN.der -noprompt
keytool -import -alias $DOMAIN -keystore $CACERTS_LIFERAY_PATH -storepass changeit -file $DOMAIN.der -noprompt -trustcacerts 

keytool -list -v -keystore $CACERTS_LIFERAY_PATH -storepass changeit -alias $DOMAIN

rm $DOMAIN.crt
