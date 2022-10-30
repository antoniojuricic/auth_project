import React from "react";
import { useState, useEffect } from "react";

import { CommentSection } from "react-comments-section";
import "react-comments-section/dist/index.css";
import { useAuth0 } from "@auth0/auth0-react";
const Comments = () => {
  const { user } = useAuth0();
  const [data, updateData] = useState([
    {
      userId: "02b",
      comId: "017",
      fullName: "johndoe",
      text: "Interesting table for sure!",
      avatarUrl: "https://ui-avatars.com/api/name=John&background=random",
      replies: [],
    },
  ]);
  return (
    <CommentSection
      currentUser={
        user
          ? {
              currentUserId: user.email,
              currentUserImg: `https://ui-avatars.com/api/name=${user.nickname}&background=random`,
              currentUserFullName: user.nickname,
            }
          : null
      }
      logIn={{
        loginLink: null,
      }}
      commentData={data}
      onSubmitAction={(data) => updateData((current) => [...current, data])}
      currentData={(data) => {
      }}
    />
  );
};

export default Comments;
