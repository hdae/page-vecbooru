import z from "zod";

// メタデータスキーマ: prepare.ts と同じ
const TagSchema = z.object({
    type: z.literal("tag"),
    name: z.string(),
    genre: z.number(),
    popularity: z.number(),
});

const AliasSchema = z.object({
    type: z.literal("alias"),
    name: z.string(),
    redirect: z.string(),
});

export const MetadataSchema = z.discriminatedUnion("type", [TagSchema, AliasSchema]);

export type Metadata = z.infer<typeof MetadataSchema>;
