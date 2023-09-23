import mongoose, {Schema} from "mongoose";


const participantsSchema = new Schema(
    {
        participantName: String,
        team: String,
        participantClassName: String,
        category: String,
    },
    {
        timestamps: true,
    }
)

const Names = mongoose.models.participantsName || mongoose.model("participantsName", participantsSchema);

export default Names;