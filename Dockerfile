# Etapa 1: Construcción de la aplicación
FROM node:14 AS build

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Etapa 2: Servir la aplicación construida
FROM nginx:alpine

# Copiar los archivos construidos desde la etapa de construcción
COPY --from=build /app/build /usr/share/nginx/html

# Exponer el puerto en el que se ejecutará la aplicación
EXPOSE 80

# Comando por defecto para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
