import {Schema,model,models} from "mongoose"

const schema=new Schema({
    creator:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    prompt:{
        type:String,
        required:[true,"Prompt is required"]
    },
    tag:{
        type:String,
        required:[true,"Tag is required"]
    }
})

export const Prompt=models.Prompt || model("Prompt",schema)