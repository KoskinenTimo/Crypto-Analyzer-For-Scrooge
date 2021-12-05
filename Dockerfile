FROM node:16-alpine AS build-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci && \
    npm run build

FROM nginx:1.20-alpine

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html