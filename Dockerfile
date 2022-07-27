FROM node:latest
WORKDIR /db_lab_front/
COPY package*.json /db_lab_front/
RUN npm install
COPY db_lab_front /db_lab_front/
#EXPOSE 3000
#CMD ["npm", "run", "start"]
