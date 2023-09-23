import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import Names from "../../../../models/participantName";

export async function PUT(request,{params}){
    const {id} = params;
    const {newparticipantName : participantName , newteam : team , newcategory : category , newparticipantClassName : participantClassName } = await request.json();
    await connectMongoDB();
    await Names.findByIdAndUpdate(id, {participantName , team , participantClassName , category});
    return NextResponse.json({message: "Details updated"}, {status: 200})
}

export async function GET(request,{params}){
    const {id} = params;
    await connectMongoDB();
    const participantIndividual = await Names.findOne({_id: id});
    return NextResponse.json({participantIndividual}, {status: 202});
}
