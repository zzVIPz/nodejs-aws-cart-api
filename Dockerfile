# Setup base environment & install dependencies
FROM node:20-alpine AS base
WORKDIR /cart-api
COPY package*.json ./
RUN npm install && npm cache clean --force

# Compile the application code
FROM base AS build
COPY . .
RUN npm run build

# Create a minimal final image with only the dependencies and compiled code needed to run the application
FROM node:20-alpine AS dist
WORKDIR /cart-api
COPY --from=base /cart-api/node_modules ./node_modules
COPY --from=build /cart-api/dist ./dist
EXPOSE 4000
CMD ["node", "dist/build.js"]