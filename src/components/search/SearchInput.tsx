import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Flex, Spinner, TextField } from "@radix-ui/themes";

interface SearchInputProps {
    query: string;
    onQueryChange: (query: string) => void;
    onBlur?: () => void;
    isSearching: boolean;
}

export const SearchInput = ({ query, onQueryChange, onBlur, isSearching }: SearchInputProps) => (
    <Flex gap="2" align="center">
        <TextField.Root
            placeholder="タグを検索..."
            size="3"
            style={{ flexGrow: 1 }}
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onBlur={onBlur}
        >
            <TextField.Slot>
                <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
        </TextField.Root>
        {isSearching && <Spinner size="2" />}
    </Flex>
);
