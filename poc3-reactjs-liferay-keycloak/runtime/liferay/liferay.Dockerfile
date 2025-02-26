ARG BASE_IMAGE=liferay/dxp:2025.q1.0-lts
FROM ${BASE_IMAGE}

USER root
RUN apt-get update && apt-get install -y netcat-traditional
USER 1000

ADD --chown=liferay:liferay https://raw.githubusercontent.com/eficode/wait-for/master/wait-for /usr/local/bin/
RUN chmod +x /usr/local/bin/wait-for
