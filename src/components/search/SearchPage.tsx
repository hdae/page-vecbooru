import type { Metadata } from "@/lib/search/schema";
import { getSearchEngine, hasCachedDatabase, search } from "@/lib/search/search";
import { Button, Card, Container, Flex, Heading, ScrollArea, Spinner, Text } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { useDeferredValue, useEffect, useState } from "react";
import { SearchInput } from "./SearchInput";
import { SearchResults } from "./SearchResults";

interface SearchPageProps {
    initialQuery?: string;
    onQueryChange?: (query: string) => void;
}

interface SearchResult {
    id: number;
    score: number;
    metadata: Metadata;
}

export const SearchPage = ({ initialQuery = "", onQueryChange }: SearchPageProps) => {
    const [shouldLoad, setShouldLoad] = useState(false);
    const [query, setQuery] = useState(initialQuery);
    const deferredQuery = useDeferredValue(query);

    // Check cache on mount - auto-start if cached
    useEffect(() => {
        hasCachedDatabase().then((cached) => {
            if (cached) {
                setShouldLoad(true);
            }
        });
    }, []);

    const engineQuery = useQuery({
        queryKey: ["engine"],
        queryFn: getSearchEngine,
        staleTime: Infinity,
        gcTime: Infinity,
        enabled: shouldLoad,
    });

    const searchQuery = useQuery({
        queryKey: ["search", deferredQuery],
        queryFn: () => search(deferredQuery),
        enabled: engineQuery.isSuccess && deferredQuery.trim().length > 0,
        placeholderData: (prev) => prev,
    });

    const results = deferredQuery.trim().length > 0
        ? (searchQuery.data ?? []) as SearchResult[]
        : [];

    // Notify URL change on blur (called from SearchInput)
    const handleBlur = () => {
        onQueryChange?.(query);
    };

    return (
        <Flex direction="column" style={{ height: "100%" }}>
            <Container size="2" p="4" style={{ flexShrink: 0 }}>
                <Flex direction="column" gap="4">
                    <Heading size="8" mb="2">VecBooru</Heading>
                    {!shouldLoad ? (
                        <Card size="3">
                            <Flex direction="column" gap="4" align="center">
                                <Heading size="4">検索エンジンの初期化</Heading>
                                <Text align="center" color="yellow">
                                    注意: 約250MBのモデルとインデックスデータをダウンロードします。
                                </Text>
                                <Button size="3" onClick={() => setShouldLoad(true)}>
                                    エンジンを読み込む
                                </Button>
                            </Flex>
                        </Card>
                    ) : engineQuery.isPending ? (
                        <Card size="3">
                            <Flex direction="column" gap="4" align="center">
                                <Heading size="4">検索エンジンをロード中</Heading>
                                <Spinner size="3" />
                            </Flex>
                        </Card>
                    ) : engineQuery.isError ? (
                        <Card size="3">
                            <Flex direction="column" gap="4" align="center">
                                <Heading size="4" color="red">初期化に失敗しました</Heading>
                                <Text align="center" color="red">
                                    {engineQuery.error?.message ?? "不明なエラー"}
                                </Text>
                                <Button size="3" onClick={() => engineQuery.refetch()}>
                                    再試行
                                </Button>
                            </Flex>
                        </Card>
                    ) : (
                        <SearchInput
                            query={query}
                            onQueryChange={setQuery}
                            onBlur={handleBlur}
                            isSearching={searchQuery.isFetching}
                        />
                    )}
                </Flex>
            </Container>

            {engineQuery.isSuccess && (
                <ScrollArea>
                    <SearchResults results={results} onSearch={setQuery} />
                </ScrollArea>
            )}
        </Flex>
    );
};
