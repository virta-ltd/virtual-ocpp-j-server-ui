# FROM node:14.15.0-alpine3.10 as builder
# WORKDIR /app
# COPY package*.json ./
# RUN npm i
# COPY . .
# RUN npm run build

# FROM nginx
# EXPOSE 80
# COPY --from=builder /app/build /usr/share/nginx/html

FROM node:14.15.0-alpine3.10 as base
WORKDIR /app
COPY package.json .
RUN npm install

# Later stages are for prod only
FROM base as build
COPY public public/
COPY src src/
RUN npm run build

FROM nginx
COPY --from=builder /app/build /usr/share/nginx/html