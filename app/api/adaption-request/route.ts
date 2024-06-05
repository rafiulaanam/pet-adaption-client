import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "@/lib/mongoDB";
import AdoptionRequest from "@/lib/models/AdaptionRequest";



export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();

    // if (!userId) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    await connectToDB();

    const {
      name,
      email,
      phone,
      additionalInfo,
      termsAndConditions,
    } = await req.json();

    if (!name || !email || !phone || !additionalInfo || !termsAndConditions) {
      return new NextResponse("Not enough data to create an adoption request", {
        status: 400,
      });
    }

    const newAdoptionRequest = await AdoptionRequest.create({
      name,
      email,
      phone,
      additionalInfo,
      termsAndConditions,
    });

    await newAdoptionRequest.save();

    return NextResponse.json(newAdoptionRequest, { status: 201 });
  } catch (err) {
    console.log("[adoption-requests_POST]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const adoptionRequests = await AdoptionRequest.find()
     .sort({ createdAt: "desc" });

    return NextResponse.json(adoptionRequests, { status: 200 });
  } catch (err) {
    console.log("[adoptionRequests_GET]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";

