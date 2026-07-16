import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as esbuild from "esbuild";
import esbuildPluginPino from "esbuild-plugin-pino";
import { rm, mkdir, writeFile } from "node:fs/promises";

globalThis.require = createRequire(import.meta.url);

const artifactDir = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(artifactDir, "dist");
const vercelOutputDir = path.resolve(artifactDir, ".vercel/output");
const vercelFuncDir = path.resolve(vercelOutputDir, "functions/index.func");
const watchMode = process.argv.includes("--watch");

const buildOptions = {
  entryPoints: [path.resolve(artifactDir, "src/index.ts")],
  platform: "node",
  bundle: true,
  format: "esm",
  outdir: distDir,
  outExtension: { ".js": ".mjs" },
  logLevel: "info",
  external: [
    "*.node",
    "sharp",
    "better-sqlite3",
    "sqlite3",
    "canvas",
    "bcrypt",
    "argon2",
    "fsevents",
    "re2",
    "farmhash",
    "xxhash-addon",
    "bufferutil",
    "utf-8-validate",
    "ssh2",
    "cpu-features",
    "dtrace-provider",
    "isolated-vm",
    "lightningcss",
    "pg-native",
    "oracledb",
    "mongodb-client-encryption",
    "nodemailer",
    "handlebars",
    "knex",
    "typeorm",
    "protobufjs",
    "onnxruntime-node",
    "@tensorflow/*",
    "@prisma/client",
    "@mikro-orm/*",
    "@grpc/*",
    "@swc/*",
    "@aws-sdk/*",
    "@azure/*",
    "@opentelemetry/*",
    "@google-cloud/*",
    "@google/*",
    "googleapis",
    "firebase-admin",
    "@parcel/watcher",
    "@sentry/profiling-node",
    "@tree-sitter/*",
    "aws-sdk",
    "classic-level",
    "dd-trace",
    "ffi-napi",
    "grpc",
    "hiredis",
    "kerberos",
    "leveldown",
    "miniflare",
    "mysql2",
    "newrelic",
    "odbc",
    "piscina",
    "realm",
    "ref-napi",
    "rocksdb",
    "sass-embedded",
    "sequelize",
    "serialport",
    "snappy",
    "tinypool",
    "usb",
    "workerd",
    "wrangler",
    "zeromq",
    "zeromq-prebuilt",
    "playwright",
    "puppeteer",
    "puppeteer-core",
    "electron",
  ],
  sourcemap: "linked",
  plugins: [esbuildPluginPino({ transports: ["pino-pretty"] })],
  banner: {
    js: `import { createRequire as __bannerCrReq } from 'node:module';
import __bannerPath from 'node:path';
import __bannerUrl from 'node:url';

globalThis.require = __bannerCrReq(import.meta.url);
globalThis.__filename = __bannerUrl.fileURLToPath(import.meta.url);
globalThis.__dirname = __bannerPath.dirname(globalThis.__filename);
    `,
  },
};

/**
 * Emit a Vercel Build Output API directory (.vercel/output) containing the
 * server bundled as a single Node serverless function. Vercel deploys this
 * prebuilt output directly and does NOT recompile/type-check the TypeScript
 * source (its per-file @vercel/node compiler cannot resolve @types/express in
 * this pnpm monorepo). See https://vercel.com/docs/build-output-api.
 */
async function buildVercelOutput() {
  await rm(vercelOutputDir, { recursive: true, force: true });
  await mkdir(vercelFuncDir, { recursive: true });

  await esbuild.build({
    ...buildOptions,
    entryPoints: [path.resolve(artifactDir, "src/vercel-handler.ts")],
    outdir: vercelFuncDir,
    // The serverless function must be self-contained (the .func directory has
    // no node_modules), so bundle the pure-JS runtime deps the app imports
    // instead of leaving them external.
    external: buildOptions.external.filter(
      (dep) => dep !== "nodemailer" && dep !== "bcrypt",
    ),
  });

  await writeFile(
    path.resolve(vercelFuncDir, ".vc-config.json"),
    JSON.stringify(
      {
        runtime: "nodejs22.x",
        handler: "vercel-handler.mjs",
        launcherType: "Nodejs",
        shouldAddHelpers: false,
        supportsResponseStreaming: true,
      },
      null,
      2,
    ),
  );

  await writeFile(
    path.resolve(vercelOutputDir, "config.json"),
    JSON.stringify(
      {
        version: 3,
        routes: [{ src: "/(.*)", dest: "/index" }],
      },
      null,
      2,
    ),
  );

  // eslint-disable-next-line no-console
  console.log("[api-server] Vercel Build Output written → .vercel/output/");
}

async function main() {
  if (watchMode) {
    const ctx = await esbuild.context(buildOptions);
    await ctx.watch();
    // eslint-disable-next-line no-console
    console.log("[api-server] esbuild watch active → dist/ (change src/ to rebuild; node --watch dist restarts)");
  } else {
    await rm(distDir, { recursive: true, force: true });
    await esbuild.build(buildOptions);
    await buildVercelOutput();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
