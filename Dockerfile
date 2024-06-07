FROM node:18-alpine3.17 as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./

RUN alias npm-ipv4="node --dns-result-order=ipv4first $(which npm)"

RUN npm-ipv4 ci
COPY . ./
RUN npm-ipv4 run build

FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 3000
ENTRYPOINT ["nginx", "-g", "daemon off;"]
