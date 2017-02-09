FROM node:7.4-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app/.src

ENV NODE_ENV=development

EXPOSE 8080
CMD [ "npm", "start" ]
