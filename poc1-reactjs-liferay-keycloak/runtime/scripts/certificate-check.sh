#!/bin/bash

openssl x509 -in ../certs/app1.dev.local/app1.dev.local.crt -noout -text

if openssl x509 -in ../certs/app1.dev.local/app1.dev.local.crt -noout -checkend 0 > /dev/null 2>&1; then
    echo "Le certificat est valide."
else
    echo "Le certificat a expiré ou est invalide."
fi