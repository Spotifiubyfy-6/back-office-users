FROM node:16.15.0
# set working direction
WORKDIR /app
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
# install application dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm i
# add app
COPY . ./
# start app
CMD ["npm", "start"]

#HOW TO USE?
#expose por defecto en port 3000
# $docker build -t backoffice .
# $docker run -p 3000:3000 backoffice