FROM node:12-alpine
LABEL maintainer="luizricardomaestri@gmail.com"

EXPOSE 5000

RUN npm -g install serve

RUN mkdir /var/app
ADD build /var/app
WORKDIR /var/app

ENTRYPOINT ["serve", "-s", "."]