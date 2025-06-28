import { NextResponse } from "next/server";
import { getBuilderDirectoryNames } from "~~/utils/scaffold-eth/getBuilders";

export async function GET() {
  const builderNames = getBuilderDirectoryNames();
  return NextResponse.json(builderNames);
}
