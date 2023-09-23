import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import IndividualResults from "../../../../models/results";

export async function PUT (request, {params}) {
    const {id} = params;
    const { newresult : result , newfirstplace: firstplace , newsecondplace : secondplace , newthirdplace : thirdplace, 
        newpointFirst : pointFirst , newpointSecond : pointSecond , newpointThird : pointThird ,
         newteamFirst : teamFirst , newteamSecond : teamSecond , newteamThird : teamThird , newcategory : category , 
         newotherPlace1 : otherPlace1 , newotherPlace2 : otherPlace2 , newotherPlace3 : otherPlace3 , newotherPlace4 : otherPlace4 , 
         newotherTeam1 : otherTeam1 , newotherPoint1 : otherPoint1 , newotherTeam2 : otherTeam2 , newotherPoint2 : otherPoint2 , 
         newotherTeam3 :  otherTeam3 , newotherPoint3 : otherPoint3 , newotherTeam4 : otherTeam4 , 
         newotherPoint4 : otherPoint4 } = await request.json();
    await connectMongoDB();
    await IndividualResults.findByIdAndUpdate(id, {result,firstplace,secondplace,thirdplace,pointFirst,pointSecond,pointThird,teamFirst,
        teamSecond,teamThird,category,
        otherPlace1,otherPlace2,otherPlace3,otherPlace4,otherTeam1,otherPoint1,otherTeam2,otherPoint2,otherTeam3,
        otherPoint3,otherTeam4,otherPoint4});
    return NextResponse.json()
}

export async function GET (request, {params}) {
    const {id} = params;
    await connectMongoDB()
    const categorisedParticipants = await IndividualResults.findOne({_id: id});
    return NextResponse.json({categorisedParticipants},{status: 200});
}

