import { API, graphqlOperation } from "aws-amplify";
import { GraphQLSubscription } from "@aws-amplify/api";
import { createComment, createPost } from "../graphql/mutations";
import { CreateCommentInput, CreatePostInput, PostStatus } from "../API";
import { onCreatePost } from "../graphql/subscriptions";

export const postContent = async (v: string) => {
  const createPostInput: CreatePostInput = {
    content: v,
    owner: "temp owner",
    status: PostStatus.published,
  };
  try {
    const res = await API.graphql(
      graphqlOperation(createPost, { input: createPostInput })
    );
    return res;
  } catch (err: any) {
    console.error(err);
  }
};

export const postContentObservable = () => {
  try {
    return API.graphql<GraphQLSubscription<typeof onCreatePost>>(
      graphqlOperation(onCreatePost)
    );
  } catch (err: any) {
    console.log(err);
  }
};

export const postComment = async ({
  postId,
  comment,
}: {
  postId: string;
  comment: string;
}) => {
  const createCommentInput: CreateCommentInput = {
    postId,
    content: comment,
    owner: "temp owner",
  };
  try {
    const res = await API.graphql(
      graphqlOperation(createComment, { input: createCommentInput })
    );
    return res;
  } catch (err: any) {
    console.error(err);
  }
};
