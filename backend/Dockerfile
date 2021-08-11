FROM node:alpine

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY ./ .
RUN npm i

CMD ["npm", "start"]