# HAGER INVESTMENT website: production image (Next.js standalone server).
# Built on the VPS by deploy.sh; see DEPLOYMENT.md.

ARG NODE_VERSION=22-alpine

# ---- 1. Dependencies -------------------------------------------------------------------
FROM node:${NODE_VERSION} AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# ---- 2. Build ----------------------------------------------------------------------------
FROM node:${NODE_VERSION} AS builder
WORKDIR /app
# Public values are inlined into the browser bundle at build time (never put secrets here).
ARG NEXT_PUBLIC_SITE_URL=https://hager-investment.com
ARG NEXT_PUBLIC_CONTACT_EMAIL=
ARG NEXT_PUBLIC_CONTACT_PHONE=
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL} \
    NEXT_PUBLIC_CONTACT_EMAIL=${NEXT_PUBLIC_CONTACT_EMAIL} \
    NEXT_PUBLIC_CONTACT_PHONE=${NEXT_PUBLIC_CONTACT_PHONE} \
    NEXT_TELEMETRY_DISABLED=1 \
    NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---- 3. Runtime --------------------------------------------------------------------------
FROM node:${NODE_VERSION} AS runner
WORKDIR /app
LABEL com.hager-investment.app="website"
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

# Unprivileged user; writable folders for the image cache, the OTP store and the private PDFs.
RUN addgroup -S -g 1001 nodejs && adduser -S -u 1001 -G nodejs nextjs \
 && mkdir -p .next/cache .data private/documents \
 && chown -R nextjs:nodejs .next .data private

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# Image optimisation: output tracing can leave out sharp's native libvips files, so ship the
# complete platform packages, then fail the build early if sharp cannot load.
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@img ./node_modules/@img
RUN node -e "require('sharp'); console.log('sharp OK')"

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/api/health >/dev/null 2>&1 || exit 1

CMD ["node", "server.js"]
