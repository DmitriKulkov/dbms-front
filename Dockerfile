FROM node:latest
WORKDIR /dbms_front/
COPY package*.json /dbms_front/
RUN npm install
COPY . /dbms_front/