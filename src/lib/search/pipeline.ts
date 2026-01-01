import { FeatureExtractionPipeline, pipeline, type ProgressCallback } from "@huggingface/transformers";

let extractor: FeatureExtractionPipeline | null = null;

export const loadPipeline = async (progress_callback?: ProgressCallback) => {
    if (extractor) return extractor;
    extractor = await pipeline(
        "feature-extraction",
        "Xenova/multilingual-e5-small",
        {
            dtype: "int8",
            progress_callback,
        },
    ) as unknown as FeatureExtractionPipeline;

    return extractor;
};
