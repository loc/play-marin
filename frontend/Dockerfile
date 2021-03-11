FROM node:14-alpine AS builder

COPY . /

ARG cms_url
ARG next_public_stripe_publishable_key
ARG stripe_secret_key
ENV NEXT_PUBLIC_BASE_URL $cms_url
ENV NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY $next_public_stripe_publishable_key
ENV STRIPE_SECRET_KEY $stripe_secret_key

RUN yarn install
RUN yarn build

FROM node:14-alpine AS production-packages

COPY package.json /package.json
COPY yarn.lock /yarn.lock

ENV NODE_ENV production
RUN yarn install

FROM node:14-alpine

COPY --from=production-packages /node_modules /node_modules
COPY --from=builder /.next /.next
COPY --from=builder /public /public

# These are needed for both build and runtime
ARG cms_url
ARG next_public_stripe_publishable_key
ARG stripe_secret_key
ENV NEXT_PUBLIC_BASE_URL $cms_url
ENV NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY $next_public_stripe_publishable_key
ENV STRIPE_SECRET_KEY $stripe_secret_key
ENV PORT=3000
EXPOSE 3000

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
RUN chown -R nextjs:nodejs /.next
USER nextjs

CMD ["node_modules/.bin/next", "start"]
