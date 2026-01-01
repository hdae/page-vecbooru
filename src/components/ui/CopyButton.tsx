import { ClipboardCopyIcon } from "@radix-ui/react-icons";
import { IconButton, Tooltip } from "@radix-ui/themes";
import toast from "react-hot-toast";

const copyToClipboard = (text: string) => {
    const formatted = text.replaceAll("_", " ");
    navigator.clipboard.writeText(formatted);
    toast.success(`コピーしました: ${formatted}`);
};

interface CopyButtonProps {
    text: string;
}

export const CopyButton = ({ text }: CopyButtonProps) => (
    <Tooltip content="クリップボードにコピー">
        <IconButton
            size="2"
            variant="solid"
            onClick={() => copyToClipboard(text)}
        >
            <ClipboardCopyIcon />
        </IconButton>
    </Tooltip>
);
