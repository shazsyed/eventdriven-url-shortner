FROM node:lts-alpine3.16 AS build
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --production
COPY . ./
RUN npm run build --omit=dev

FROM nginx:stable-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]