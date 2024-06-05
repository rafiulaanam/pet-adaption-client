

import AdoptionRequest from "@/lib/models/AdaptionRequest";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";

import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { requestId: string } }
) => {
  try {
    await connectToDB();

    const adoptionRequest = await AdoptionRequest.findById(params.requestId);

    if (!adoptionRequest) {
      return new NextResponse(
        JSON.stringify({ message: "Adoption request not found" }),
        { status: 404 }
      );
    }
    return new NextResponse(JSON.stringify(adoptionRequest), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": `${process.env.ECOMMERCE_STORE_URL}`,
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (err) {
    console.log("[requestId_GET]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};
export const PUT = async (
  req: NextRequest,
  { params }: { params: { requestId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const adoptionRequest = await AdoptionRequest.findById(params.requestId);

    if (!adoptionRequest) {
      return new NextResponse(
        JSON.stringify({ message: "Adoption request not found" }),
        { status: 404 }
      );
    }

    const {
      name,
      email,
      phone,
      additionalInfo,
      termsAndConditions,
    } = await req.json();

    if (!name ||!email ||!phone ||!additionalInfo ||!termsAndConditions) {
      return new NextResponse("Not enough data to update adoption request", {
        status: 400,
      });
    }

    // Update adoption request
    const updatedAdoptionRequest = await AdoptionRequest.findByIdAndUpdate(
      adoptionRequest._id,
      {
        name,
        email,
        phone,
        additionalInfo,
        termsAndConditions,
      },
      { new: true }
    );

    await updatedAdoptionRequest.save();

    return NextResponse.json(updatedAdoptionRequest, { status: 200 });
  } catch (err) {
    console.log("[requestId_POST]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { requestId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const adoptionRequest = await AdoptionRequest.findById(params.requestId);

    if (!adoptionRequest) {
      return new NextResponse(
        JSON.stringify({ message: "Adoption request not found" }),
        { status: 404 }
      );
    }

    await AdoptionRequest.findByIdAndDelete(adoptionRequest._id);

    return new NextResponse(JSON.stringify({ message: "Adoption request deleted" }), {
      status: 200,
    });
  } catch (err) {
    console.log("[requestId_DELETE]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";