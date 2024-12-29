import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
}

export async function POST(request: Request) {
  try {
    // Retrieve the current user
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    // Extract `listingId` from the request body
    const body = await request.json();
    const { listingId }: IParams = body;

    if (!listingId || typeof listingId !== "string") {
      return NextResponse.json({ error: "Invalid listing ID" }, { status: 400 });
    }

    // Add the listing ID to the user's favorite list
    const favoriteIds = [...(currentUser.favoriteIds || []), listingId];

    const updatedUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: { favoriteIds },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error in POST /api/favourites:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    // Retrieve the current user
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    // Extract `listingId` from the request body
    const body = await request.json();
    const { listingId }: IParams = body;

    if (!listingId || typeof listingId !== "string") {
      return NextResponse.json({ error: "Invalid listing ID" }, { status: 400 });
    }

    // Remove the listing ID from the user's favorite list
    const favoriteIds = (currentUser.favoriteIds || []).filter((id) => id !== listingId);

    const updatedUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: { favoriteIds },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error in DELETE /api/favourites:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
