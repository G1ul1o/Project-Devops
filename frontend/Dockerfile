FROM node:24.2.0 AS builder

WORKDIR /app

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=${REACT_APP_API_URL}

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .

RUN echo "VITE_API_URL is set to $VITE_API_URL"


RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]