#!/bin/sh

domains=$(printf "%s\n" \
    "app1.dev.local:/traefik/providers/files/app1.dev.local.crt:/traefik/providers/files/app1.dev.local.key" \
    "app2.dev.local:/traefik/providers/files/app2.dev.local.crt:/traefik/providers/files/app2.dev.local.key" \
    "app3.dev.local:/traefik/providers/files/app3.dev.local.crt:/traefik/providers/files/app3.dev.local.key" \
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

    # Apply chmod 777 to the certificates
    if [ -f "$crt_path" ] && [ -f "$key_path" ]; then
        chmod 777 "$crt_path" "$key_path"
        echo "Applied chmod to $crt_path and $key_path"
    else
        echo "Error: Certificate files not found for $cn"
    fi
    
done