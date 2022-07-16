import * as React from "react";
import { OnCreatePostSubscription } from "../../API";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CommentForm from "../comment-form";

type Props = {
  posts: OnCreatePostSubscription["onCreatePost"][];
  onClickComment: (obj: { comment: string; postId: string }) => void;
};

export default function PostList({ posts, onClickComment }: Props) {
  return (
    <Box>
      {posts.map((post) =>
        post ? (
          <Card key={post?.id} sx={{ minWidth: 275, mb: 2 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                content: {post?.content}
              </Typography>
              {post?.comments?.items?.map((comment) => (
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  comment: {comment?.content}
                </Typography>
              ))}
            </CardContent>
            <CardActions>
              <CommentForm postId={post.id} onClickComment={onClickComment} />
            </CardActions>
          </Card>
        ) : (
          <></>
        )
      )}
    </Box>
  );
}
