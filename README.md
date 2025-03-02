# PAY

## Getting Started

Install dependencies:

```bash
npm run setup


```

run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev

```

Open http://localhost:3000 with your browser to see the result.

## Run web on Docker

Build Docker Images

```bash
docker build -t pay.latest ./
```

Run web

```bash
docker run -d -p 80:3000 pay.latest
```

Open http://localhost with your browser to see the result.

## Run web on Docker Compose

```bash
docker compose up  --build -d

# or

docker compose up  -d
```
