FROM node:12

WORKDIR /app

# copy important asset source
COPY ./package.json package.json
COPY ./tsconfig.json tsconfig.json
COPY ./src src
COPY ./webpack.config.js webpack.config.js

# copy bash script
COPY ./scripts/start.sh scripts/start.sh
RUN ["chmod", "+x", "scripts/start.sh"]

ENTRYPOINT ["scripts/start.sh"]
