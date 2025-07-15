# Dockerfile-dev
FROM node:20-alpine

WORKDIR /app

# 1️⃣  Copia manifest e instala deps (cache)
COPY package*.json ./
RUN npm ci           \
 && npm install -g @angular/cli json-server concurrently

# 2️⃣  Copia el resto del código
COPY . .

# 3️⃣  Expone puertos de UI y API mock
EXPOSE 4200 3000

# 4️⃣  Script de arranque (usa el que ya tienes en package.json)
CMD ["npm", "run", "dev"]