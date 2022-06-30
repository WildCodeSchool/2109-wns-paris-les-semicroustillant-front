# Instructions

Front and back folders have to be in the same parent folder.
They must match the exact following names.
Build command line must be executed in back repository.

## Name of repositories

### Back-end folder

`2109-wns-paris-les-semicroustillant-back`

### Front-end folder

`2109-wns-paris-les-semicroustillant-front`

## Build images with docker-compose

```bash
docker-compose -f docker-compose.dev.yml up --build
```

It can take up to 5 minutes to have everything built, so go grab a cup of coffee :coffee:

## Server URL

### Back-end

`http://localhost:5050/`

### Front-end

`http://localhost:8080/`

