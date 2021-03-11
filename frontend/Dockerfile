FROM node:14-alpine AS builder

COPY . /

ARG cms_url
ENV NEXT_PUBLIC_BASE_URL $cms_url

RUN yarn install
RUN yarn build

FROM node:14-alpine AS production-packages

COPY package.json yarn.lock .

ENV NODE_ENV production
RUN yarn install

FROM node:14-alpine

COPY --from=production-packages /node_modules /node_modules
COPY --from=builder /.next /.next
COPY --from=builder /public /public

ENV PORT=3000
EXPOSE 3000

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
RUN chown -R nextjs:nodejs /.next
USER nextjs

CMD ["node_modules/.bin/next", "start"]
