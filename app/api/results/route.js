import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import IndividualResults from "../../../models/results";

export async function POST(request ){
    const {result,firstplace,secondplace,thirdplace,pointFirst,pointSecond,pointThird,teamFirst,teamSecond,teamThird,category,
        otherPlace1,otherPlace2,otherPlace3,otherPlace4,addIndividualPoint,
        otherTeam1,otherPoint1,otherTeam2,otherPoint2,otherTeam3,otherPoint3,otherTeam4,otherPoint4} = await request.json();
    await connectMongoDB();
    await IndividualResults.create({result,firstplace,secondplace,thirdplace,pointFirst,pointSecond,pointThird,teamFirst,teamSecond,
        teamThird,category,otherPlace1,otherPlace2,otherPlace3,otherPlace4,addIndividualPoint,
        otherTeam1,otherPoint1,otherTeam2,otherPoint2,otherTeam3,otherPoint3,otherTeam4,otherPoint4});
    return NextResponse.json({message:"result Uploaded successfully"},{status: 203})
}

export async function GET(){
    await connectMongoDB();
    const allIndividualResults = await IndividualResults.find();
    return NextResponse.json({allIndividualResults})
}

export async function DELETE(request){
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await IndividualResults.findByIdAndDelete(id);
    return NextResponse.json({message: "Successfully deleted"},{status: 200})
}