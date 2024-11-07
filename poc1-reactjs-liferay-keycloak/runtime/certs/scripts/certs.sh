#!/bin/sh

domains=$(printf "%s\n" \
    "app1.dev.local:/certs/app1.dev.local/app1.dev.local.crt:/certs/app1.dev.local/app1.dev.local.key" \
    "apim.dev.local:/traefik/providers/files/apim.dev.local.crt:/traefik/providers/files/apim.dev.local.key" \
    "portal.dev.local:/traefik/providers/files/portal.dev.local.crt:/traefik/providers/files/portal.dev.local.key" \
    "sso.dev.local:/traefik/providers/files/sso.dev.local.crt:/traefik/providers/files/sso.dev.local.key")

printf "%s\n" "$domains" | while IFS= read -r domain; do
    crt_path=$(echo "$domain" | cut -d: -f2)
    key_path=$(echo "$domain" | cut -d: -f3)
    cn=$(echo "$domain" | cut -d: -f1)

    if [ -f "$crt_path" ] && openssl x509 -in "$crt_path" -noout -checkend 0 > /dev/null 2>&1; then
        echo "$crt_path is valid : skipping certificate generation"
    else
        echo "$crt_path is invalid : generating new certificate"
        openssl req -x509 -newkey rsa:4096 -keyout "$key_path" -out "$crt_path" -days 365 -nodes -subj /CN="$cn"
    fi
done