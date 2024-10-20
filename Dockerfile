FROM node:18.20.3

ARG ANGULAR_ENV=development

USER node:node

WORKDIR /app

COPY --chown=node:node package.json package-lock.json ./

RUN npm install

COPY --chown=node:node . .

RUN npm run build -- --configuration=$ANGULAR_ENV

CMD npm start