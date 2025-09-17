FROM node:20-alpine

WORKDIR /src

COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npx next telemetry disable
# RUN npm run dev

CMD ["npm", "run", "dev"]
