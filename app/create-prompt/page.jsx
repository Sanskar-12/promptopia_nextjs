"use client"

import Form from "@/components/Form"
import { useState } from "react"
import axios from "axios"
import {useSession} from "next-auth/react"
import { useRouter } from "next/navigation"


const CreatePrompt = () => {

    const {data:session}=useSession()
    const router=useRouter()

    const [submitting,setSubmitting]=useState(false)
    const [post,setPost]=useState({
        prompt:'',
        tag:''
    })

    const createPrompt=async(e)=>{
        e.preventDefault()
        setSubmitting(true)

        try {
            await axios.post("/api/prompt/new",{
                prompt:post.prompt,
                tag:post.tag,
                userId:session?.user.id
            },{
                headers:{
                    "Content-Type":"application/json"
                }
            })

            router.push("/")


        } catch (error) {
            console.log(error)
        }
    }

  return (
    <Form
    type="Create"
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt
