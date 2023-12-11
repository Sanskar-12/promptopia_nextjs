"use client"

import Form from "@/components/Form"
import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter,useSearchParams } from "next/navigation"


const EditPrompt = () => {

    const router=useRouter()
    const searchParams=useSearchParams()
    const promptId=searchParams.get('id')

    const [submitting,setSubmitting]=useState(false)
    const [post,setPost]=useState({
        prompt:'',
        tag:''
    })

    useEffect(()=>{
        const getPromptDetails=async()=>{
            const {data}=await axios.get(`/api/prompt/${promptId}`)

            setPost({
                prompt:data.prompt,
                tag:data.tag
            })
        }
        if(promptId)
        {
            getPromptDetails()

        }
    },[promptId])

    const updatePrompt=async(e)=>{
        e.preventDefault()
        setSubmitting(true)

        try {
            await axios.patch(`/api/prompt/${promptId}`,{
                prompt:post.prompt,
                tag:post.tag,
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
    type="Edit"
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={updatePrompt}
    />
  )
}

export default EditPrompt
