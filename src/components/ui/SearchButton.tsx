import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { IconButton, Tooltip } from "@radix-ui/themes";

interface SearchButtonProps {
    text: string;
    onSearch: (text: string) => void;
}

export const SearchButton = ({ text, onSearch }: SearchButtonProps) => (
    <Tooltip content="このタグで検索">
        <IconButton
            size="2"
            variant="solid"
            onClick={() => onSearch(text)}
        >
            <MagnifyingGlassIcon />
        </IconButton>
    </Tooltip>
);
