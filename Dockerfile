FROM oven/bun
RUN echo "deb http://deb.debian.org/debian buster-backports main contrib" | tee -a /etc/apt/sources.list
RUN echo "deb-src http://deb.debian.org/debian buster-backports main contrib" | tee -a /etc/apt/sources.list
RUN apt-get update && apt-get install -y zfsutils-linux

WORKDIR /usr/src/app
ADD . /usr/src/app/

RUN bun install
CMD ["bun", "/usr/src/app/src/index.ts"]

