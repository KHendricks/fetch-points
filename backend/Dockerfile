FROM node:alpine

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY ./ .
RUN npm i
RUN apk add --no-cache python3 py3-pip

# Install packages for unit test
RUN pip3 install -r /app/test/requirements.txt

CMD ["npm", "start"]