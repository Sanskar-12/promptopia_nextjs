import { Prompt } from "@/models/prompt"
import { connectDB } from "@/utils/database"


export const GET=async(req,{params})=>{
    try {
        await connectDB()

        const prompt=await Prompt.findById(params.id).populate("creator")

        if(!prompt)
        {
            return new Response("Prompt Not Found",{status:400})
        }

        return new Response(JSON.stringify(prompt),{status:200})
    } catch (error) {
        return new Response("Failed to fetch Prompt",{status:400})
    }
}


export const PATCH=async(req,{params})=>{
    try {
        const {prompt,tag}=await req.json()
        await connectDB()

        const existingprompt=await Prompt.findById(params.id)

        if(!existingprompt)
        {
            return new Response("Prompt Not Found",{status:400})
        }

        existingprompt.prompt=prompt
        existingprompt.tag=tag

        await existingprompt.save()
        return new Response(JSON.stringify(existingprompt),{status:200})

    } catch (error) {
        return new Response("Failed to update Prompt",{status:400})
    }
}


export const DELETE=async(req,{params})=>{
    try {
        await connectDB()
       await Prompt.findByIdAndDelete(params.id)

        return new Response("Prompt Deleted Successfully",{status:200})
    } catch (error) {
        return new Response("Failed to fetch profile",{status:400})
    }
}