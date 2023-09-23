import connectMongoDB from "../../../libs/mongodb";
import { NextResponse } from "next/server";
import teamPoints from "../../../models/teampoint";


export async function POST(request){
    const {teamfirst, pointforfirst , teamsecond , pointforsecond , teamthird , pointforthird} = await request.json();
    await connectMongoDB();
    await teamPoints.create({teamfirst, pointforfirst , teamsecond , pointforsecond , teamthird , pointforthird});
    return NextResponse.json({message:"Post success"},{status:200});   
}

export async function PUT (request){
    const {teamfirst, pointforfirst , teamsecond , pointforsecond , teamthird , pointforthird} = await request.json();
    await connectMongoDB();
    await teamPoints.findOneAndUpdate({teamfirst, pointforfirst ,teamsecond ,pointforsecond , teamthird , pointforthird});
    return NextResponse.json({message: "it is ok"} , {status: 200})
    
}

export async function GET(request){
    await connectMongoDB();
    const dBFinalizedTeamPoints = await teamPoints.find() ;
    return NextResponse.json({dBFinalizedTeamPoints})
}