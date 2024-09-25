#!/bin/bash

# Vérifie si le paramètre est renseigné
if [ -z "$1" ]
then
    echo "Erreur : Vous devez spécifier un nom de fichier en paramètre."
    exit 1
fi

docker cp $1 lfroauth-liferay:/opt/liferay/deploy