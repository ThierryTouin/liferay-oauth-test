#!/bin/bash
echo " Start"
openssl s_client -showcerts -connect sso.dev.local:443 < /dev/null | sed -n '/-----BEGIN CERTIFICATE-----/,/-----END CERTIFICATE-----/p' > sso.dev.local.crt
openssl x509 -in sso.dev.local.crt -out sso.dev.local.der -outform DER

docker cp sso.dev.local.der lfroauth-liferay:/opt/liferay

# sudo docker exec -u root -it lfroauth-liferay bash  

sudo docker exec -u root -it lfroauth-liferay keytool -import -alias sso.dev.local -keystore /usr/lib/jvm/zulu11/lib/security/cacerts -storepass changeit -file sso.dev.local.der -noprompt

# keytool -list -v -keystore /usr/lib/jvm/zulu11/lib/security/cacerts -storepass changeit 

rm sso.dev.local.crt sso.dev.local.der