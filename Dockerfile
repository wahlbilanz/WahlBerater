# latest node has issue: https://github.com/Azure/static-web-apps/issues/231

# build the website
FROM node:14 as donator
COPY . /data
WORKDIR /data
RUN npm ci
RUN npm run build --prod

# deploy to an nginx
FROM nginx
COPY --from=donator /data/dist/wahlberater /usr/share/nginx/html

