FROM node:12

WORKDIR /app

# copy dist folder
COPY ./dist ./

# setup env
ENV NODE_ENV=production

# cmd
CMD ["node", "index.js"]
