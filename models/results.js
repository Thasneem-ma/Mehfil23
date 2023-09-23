import mongoose,{Schema} from "mongoose"

const resultSchema = new Schema(
    {
        result: String,
        category: String,
        addIndividualPoint : Boolean ,
        firstplace: String,
        pointFirst: Number,
        teamFirst : String,
        secondplace: String,
        pointSecond: Number,
        teamSecond : String,
        thirdplace: String,
        pointThird: Number,
        teamThird : String,
        otherPlace1: String,
        otherTeam1 : String,
        otherPoint1 : String,
        otherPlace2: String,
        otherTeam2 : String,
        otherPoint2 : String,
        otherPlace3: String,
        otherTeam3 : String,
        otherPoint3 : String,
        otherPlace4 : String,
        otherTeam4 : String,
        otherPoint4 : String,
    },
    {
        timestamps: true,
    }
)

const IndividualResults = mongoose.models.ProgrammeResults || mongoose.model("ProgrammeResults", resultSchema);

export default IndividualResults;