import mongoose,{Schema} from "mongoose";

const imageSchema = new Schema({
    imgUrl : String ,
    isResult : Boolean,
},{
    timestamps: true,
});

const images = mongoose.models.images || mongoose.model("images", imageSchema);

export default images