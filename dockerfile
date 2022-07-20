FROM node:18-alpine3.15 as build-stage

WORKDIR /app

COPY package*.json /app/

RUN npm i

COPY . /app/

RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]