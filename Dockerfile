FROM node:16-alpine AS build-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci && \
    npm run build

FROM node:16-alpine

WORKDIR /usr/src/app

COPY --from=build-stage /usr/src/app/build /usr/src/app/build

RUN npm install -g serve

EXPOSE 3000

CMD serve -s build