import { GENRE_COLORS, GENRE_NAMES } from "@/components/search/constants";
import { CopyButton } from "@/components/ui/CopyButton";
import { SearchButton } from "@/components/ui/SearchButton";
import type { Metadata } from "@/lib/search/schema";
import { Badge, Card, Flex, Text } from "@radix-ui/themes";

interface ResultCardProps {
    metadata: Metadata;
    score: number;
    onSearch: (text: string) => void;
}

export const ResultCard = ({ metadata, score, onSearch }: ResultCardProps) => (
    <Card>
        <Flex justify="between" align="center" gap="4">
            <Flex align="center" gap="2" style={{ minWidth: 0 }}>
                {metadata.type === 'tag' ? (
                    <>
                        <CopyButton text={metadata.name} />
                        <Text size="4" weight="bold" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {metadata.name}
                        </Text>
                    </>
                ) : (
                    <>
                        <CopyButton text={metadata.redirect} />
                        <Text size="4" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {metadata.name}
                            <Text color="gray"> → </Text>
                            <Text weight="bold">{metadata.redirect}</Text>
                        </Text>
                    </>
                )}
            </Flex>
            <Flex align="center" gap="3" style={{ flexShrink: 0 }}>
                {metadata.type === 'tag' && (
                    <>
                        <Badge size="2" color={GENRE_COLORS[metadata.genre] ?? "gray"} variant="solid">
                            {GENRE_NAMES[metadata.genre] ?? `genre:${metadata.genre}`}
                        </Badge>
                        <Text size="2" color="gray">
                            人気度: {metadata.popularity}
                        </Text>
                    </>
                )}
                {metadata.type === 'alias' && (
                    <SearchButton
                        text={metadata.redirect}
                        onSearch={onSearch}
                    />
                )}
                <Text size="1" color="gray">
                    {(score * 100).toFixed(1)}%
                </Text>
            </Flex>
        </Flex>
    </Card>
);
