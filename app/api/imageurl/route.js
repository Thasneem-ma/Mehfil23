import { NextResponse } from "next/server";
import images from "../../../models/images";
import connectMongoDB from "../../../libs/mongodb";


export async function POST(request){
    const {imgUrl , isResult} = await request.json();
    await connectMongoDB();
    await images.create({imgUrl , isResult});
    return NextResponse.json({message: "imageUrl uploaded successfully"},{status: 200})
}

export async function GET(request){
    await connectMongoDB();
    const imageurls = await images.find();
    return NextResponse.json({imageurls})
}

export async function DELETE(request){
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await images.findByIdAndDelete(id);
    return NextResponse.json({message: "image deleted"},{status: 200})
}
