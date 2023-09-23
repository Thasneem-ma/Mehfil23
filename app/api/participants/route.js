import { NextResponse } from "next/server";
import Names from "../../../models/participantName";
import connectMongoDB from "../../../libs/mongodb";


export async function POST(request){
    const { participantName , team , participantClassName , category} = await request.json();
    await connectMongoDB();
    await Names.create({participantName, team, participantClassName, category})
    return NextResponse.json({message:"participant created"},{status: 201})
}

export async function GET(){
    await connectMongoDB();
    const names = await Names.find();
    return NextResponse.json({names});
}

export async function DELETE(request){
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Names.findByIdAndDelete(id);
    return NextResponse.json({message: "Deleted successfully"}, {status: 202});
}