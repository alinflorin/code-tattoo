FROM node:lts-alpine as node
WORKDIR /app
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm ci
RUN ./node_modules/.bin/ngcc --properties es2015
COPY . .
RUN npm run ng build -- --prod

FROM abiosoft/caddy
COPY --from=node /app/dist/ui/ /srv
