"use client";

import Profile from "@/components/Profile";
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";

const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const router=useRouter()

  const handleDelete = async (post) => {
    let isConfirmed=confirm("Do you want to delete this post?")

    if(isConfirmed)
    {
      try {
        await axios.delete(`/api/prompt/${post._id}`)

        const filteredPosts=posts.filter((p)=>p._id !==post._id)

        setPosts(filteredPosts)
      } catch (error) {
        console.log(error)
      }
    }
  };
  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`)
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get(`/api/users/${session?.user.id}/posts`);

      setPosts(data);
      console.log(data)
    };
    if (session?.user.id) {
      fetchPosts();
    }
  }, []);

  return (
    <Profile
      name="My"
      desc="Welcome to your personalised profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
