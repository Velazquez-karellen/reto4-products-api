FROM node:20-alpine

WORKDIR /app

# Copiar package.json y package-lock.json (si existe)
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el código fuente
COPY src ./src

# Variables de entorno por defecto (se pueden sobreescribir en docker-compose)
ENV PORT=3000
ENV JWT_SECRET=dev-secret

EXPOSE 3000

CMD ["node", "src/index.js"]
