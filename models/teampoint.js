import mongoose,{Schema} from "mongoose";

const teampointschema = new Schema({
    teamfirst : String ,
    pointforfirst : Number ,
    teamsecond : String ,
    pointforsecond : Number ,
    teamthird : String ,
    pointforthird : Number ,
},
{
    timestamps: true,
},
)

const teamPoints = mongoose.models.teamPointsDb || mongoose.model("teamPointsDb", teampointschema);

export default teamPoints