import {
  getProfileByUsername,
  getUserLikedPosts,
  getUserPosts,
  isFollowing,
} from "@/actions/profile.action";
import { notFound } from "next/navigation";
import React from "react";
import ProfilePageClient from "./ProfilePageClient";
import type { Metadata } from "next";

// export async function generateMetadata({ params }: Props) {
//   const user = await getProfileByUsername(params.username);
//   if (!user) return;

//   return {
//     title: `${user.name ?? user.username}`,
//     description: user.bio || `Check out ${user.username}'s profile`,
//   };
// }

interface Props {
  params: Promise<{
    username: string;
  }>;
}

async function ProfilePage({ params }: Props) {
  const { username } = await params; // Await the promise to get the actual `username`
  const user = await getProfileByUsername(username);

  if (!user) notFound();

  const [posts, likedPosts, isCurrentUserFollowing] = await Promise.all([
    getUserPosts(user.id),
    getUserLikedPosts(user.id),
    isFollowing(user.id),
  ]);

  return (
    <ProfilePageClient
      user={user}
      posts={posts}
      likedPosts={likedPosts}
      isFollowing={isCurrentUserFollowing}
    />
  );
}

export default ProfilePage;
