import { Prompt } from "../../../../models/prompt.js";
import { connectDB } from "../../../../utils/database.js";

export const POST =async(req)=>  {
  const { prompt, tag, userId } = await req.json();

  try {
    await connectDB();
    await Prompt.create({
      tag,
      prompt,
      creator: userId,
    });

   return new Response("Created",{status:200})
  } catch (error) {
    return new Response("Failed to create",{status:400})
  }
};
