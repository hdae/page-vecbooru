import { Database } from "@hdae/hnsw";
import { loadPipeline } from "./pipeline";
import { MetadataSchema } from "./schema";

type DB = Database<typeof MetadataSchema>;

const CACHE_NAME = "vecbooru-db-v1";
const DB_URL = "/page-vecbooru/index.bin";

// Singleton promise pattern - cleaner than mutable state
let initPromise: Promise<DB> | null = null;

// Check if database is cached
export const hasCachedDatabase = async (): Promise<boolean> => {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(DB_URL);
    return cachedResponse !== undefined;
};

async function fetchWithCache(url: string): Promise<ArrayBuffer> {
    const cache = await caches.open(CACHE_NAME);

    // Check cache first
    const cachedResponse = await cache.match(url);
    if (cachedResponse) {
        console.log("Using cached database");
        return cachedResponse.arrayBuffer();
    }

    // Fetch from network
    console.log("Fetching database from network");
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch ${url}`);

    // Clone and cache the response
    await cache.put(url, response.clone());

    return response.arrayBuffer();
}

export const getSearchEngine = (): Promise<DB> => {
    if (initPromise) return initPromise;

    initPromise = (async () => {
        // Load pipeline first
        await loadPipeline();

        // Fetch and load database (with cache)
        const dbData = await fetchWithCache(DB_URL);

        return Database.load(new Uint8Array(dbData), {
            schema: MetadataSchema,
            compress: "gzip"
        });
    })();

    return initPromise;
};

export const search = async (query: string) => {
    const db = await getSearchEngine();
    const extractor = await loadPipeline();

    // クエリをベクトル化
    const output = await extractor(`query: ${query.replaceAll(/[^\\]_/g, " ")}`, {
        pooling: "mean",
        normalize: true,
    });

    const queryVector = new Float32Array(output.tolist()[0] as number[]);

    // 検索実行
    return db.search(queryVector, 100);
};
