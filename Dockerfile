FROM node:12

WORKDIR /app

# copy dist folder
COPY ./dist ./

# copy scripts
COPY ./scripts ./scripts

# setup env
ENV NODE_ENV=production

# chmoding
RUN chmod +x ./scripts/wait-for-it.sh ./scripts/init.sh

# entry
ENTRYPOINT ["./scripts/init.sh"]

# cmd
CMD ["node", "index.js"]
