FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8000

# Start the app
# CMD [ "node", "dist/app.js" ]
# CMD ["nodemon","src/app.ts"]
CMD ["npm", "run", "dev"]

