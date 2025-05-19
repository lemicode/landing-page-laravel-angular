FROM bitnami/node

WORKDIR /usr/src/app

COPY . .

RUN npm install -g @angular/cli

RUN npm install

EXPOSE 4200

CMD ["ng", "s", "--host", "0.0.0.0"]
