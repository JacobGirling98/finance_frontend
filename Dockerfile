FROM node:18-alpine3.17 as build
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm i --loglevel verbose --omit dev
COPY . ./
RUN npm run build --loglevel verbose

FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 3000
ENTRYPOINT ["nginx", "-g", "daemon off;"]
