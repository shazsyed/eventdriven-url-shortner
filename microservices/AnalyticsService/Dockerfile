FROM node:lts-alpine3.16
WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN npm install --omit=dev
CMD ["node", "app.js"]