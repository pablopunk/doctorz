# 🩺 Doctorz

> Monitors ZFS Pools with `zpool status` and sends you an email if the pool has been degraded.


## Config

1. Create a Sendgrid account
2. Setup an "sender" email address in Sendgrid
2. Get a Sendgrid API key


## Docker

```bash
docker run --privileged \
-e SENDGRID_API_KEY=your-api-key \
-e EMAIL_FROM=no-reply@example.com \
-e EMAIL_TO=your-email@example.com \
-e INTERVAL=600 \ # if not provided, defaults to 900sec (15 minutes)
pablopunk/doctorz
```

## Docker compose

```yaml
  doctorz:
    container_name: doctorz
    image: pablopunk/doctorz
    privileged: true
    environment:
      - SENDGRID_API_KEY=your-api-key
      - EMAIL_FROM=no-reply@example.com
      - EMAIL_TO=your-email@example.com
      - INTERVAL=600 # if not provided, defaults to 900sec (15 minutes)
```


## Without docker

It's meant to run in **Docker**, but if you wanna run it manually I use [bun.sh](https://bun.sh) to run it instead of nodeJS. Make sure you copy `.env.example` to `.env` and replace it with your own values.

```bash
git clone https://github.com/pablopunk/doctorz && cd doctorz
cp .env.example .env # edit .env with your own values
bun run src/index.ts
```

## If it's degraded

You'll get an email like this:

> ZFS pool is degraded
> Fix it ASAP
> Full output below:
> ...

And then it will not send you an email until you fix it.
