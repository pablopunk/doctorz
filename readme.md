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
```


## Without docker

It's meant to run in **Docker**, but if you wanna run it manually I use [bun.sh](https://bun.sh) to run it instead of nodeJS. Make sure you copy `.env.example` to `.env` and replace it with your own values.

```bash
bun run src/index.ts
```
