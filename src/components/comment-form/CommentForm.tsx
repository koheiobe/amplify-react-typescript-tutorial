import TextareaAutosize from "@mui/material/TextareaAutosize";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { useState } from "react";

type Props = {
  onClickComment: (obj: { comment: string; postId: string }) => void;
  postId: string;
};

export default function PostForm({ onClickComment, postId }: Props) {
  const [comment, setComment] = useState("");
  const onClickedComment = () => {
    onClickComment({ comment, postId });
  };
  return (
    <Box>
      <TextareaAutosize
        aria-label="minimum height"
        minRows={3}
        placeholder="Minimum 3 rows"
        style={{ width: 100 }}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button onClick={onClickedComment}>Comment</Button>
    </Box>
  );
}
