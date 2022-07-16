import TextareaAutosize from "@mui/material/TextareaAutosize";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { useState } from "react";

type Props = {
  onClickPost: (s: string) => void;
};

export default function PostForm({ onClickPost }: Props) {
  const [content, setContent] = useState("");
  return (
    <Box>
      <TextareaAutosize
        aria-label="minimum height"
        minRows={3}
        placeholder="Minimum 3 rows"
        style={{ width: 200 }}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button onClick={() => onClickPost(content)}>Post</Button>
    </Box>
  );
}
