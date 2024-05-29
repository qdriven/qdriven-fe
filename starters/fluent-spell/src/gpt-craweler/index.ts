import { crawl, write } from "./core.js";
import { defaultConfig } from "./config";

await crawl(defaultConfig);
await write(defaultConfig);
