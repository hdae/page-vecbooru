import type { Metadata } from "@/lib/search/schema";
import { Container, Flex } from "@radix-ui/themes";
import { ResultCard } from "./ResultCard";

interface SearchResult {
    id: number;
    score: number;
    metadata: Metadata;
}

interface SearchResultsProps {
    results: SearchResult[];
    onSearch: (query: string) => void;
}

export const SearchResults = ({ results, onSearch }: SearchResultsProps) => (
    <Container size="2" px="4" pb="4">
        <Flex direction="column" gap="3">
            {results.map((item, i) => (
                <ResultCard
                    key={i}
                    metadata={item.metadata}
                    score={item.score}
                    onSearch={onSearch}
                />
            ))}
        </Flex>
    </Container>
);
