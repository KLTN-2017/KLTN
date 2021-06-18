# build environment
FROM node:14-alpine as build
WORKDIR /app
COPY . .
RUN yarn install
RUN npm rebuild node-sass
RUN yarn build
# production environment
FROM nginx
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
