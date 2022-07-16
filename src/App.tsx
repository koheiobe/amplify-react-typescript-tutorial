import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Header from "./components/header";
import Container from "@mui/material/Container";

import awsExports from "./aws-exports";
import PostForm from "./components/post-form";

import { postComment, postContent, postContentObservable } from "./lib/api";
import { useEffect, useState } from "react";
import { OnCreatePostSubscription } from "./API";
import PostList from "./components/post-list";
Amplify.configure(awsExports);

// reference for original auth ui: https://docs.amplify.aws/lib/auth/emailpassword/q/platform/js/

export default function App() {
  const { posts } = usePostContentList();

  console.log(posts);
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <Header signOut={signOut} user={user} />
          <Container maxWidth="sm" sx={{ mt: 2 }}>
            <PostForm onClickPost={postContent} />
            <PostList posts={posts} onClickComment={postComment} />
          </Container>
        </main>
      )}
    </Authenticator>
  );
}

const usePostContentList = () => {
  const [posts, setPosts] = useState<
    OnCreatePostSubscription["onCreatePost"][]
  >([]);
  useEffect(() => {
    const subscription = postContentObservable()?.subscribe(
      ({ value: { data } }) => {
        const d = data as OnCreatePostSubscription;
        if (d.onCreatePost) setPosts([...posts, d.onCreatePost]);
      },
      (err) => console.error(err)
    );
    return () => {
      subscription?.unsubscribe();
    };
  });
  return { posts };
};
