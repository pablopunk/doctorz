# 🩺 Doctorz

> Monitors ZFS Pools with `zpool status` and sends you an email if the pool has been degraded.


## Config

1. Make sure you have a Sendgrind account that's setup to send emails from a specific address.  
2. Get a Sendgrid API key
3. Set your env vars (and don't forget to pass them to docker)
```bash
SENDGRID_API_KEY=your-key-here
EMAIL_FROM=no-reply@example.com
EMAIL_TO=your-email@example.com
```


## Docker

```bash
docker build . -t doctorz && docker run --privileged doctorz
```

## Docker compose

```yaml
  doctorz:
    container_name: doctorz
    image: pablopunk/doctorz
    privileged: true
    environment:
      - SENDGRID_API_KEY=$SENDGRID_API_KEY
      - EMAIL_FROM=$EMAIL_FROM
      - EMAIL_TO=$EMAIL_TO
```


## Without docker

It's meant to run in **Docker**, but if you wanna run it manually I use [bun.sh](https://bun.sh) to run it instead of nodeJS. Make sure you copy `.env.example` and replace it with your values.
