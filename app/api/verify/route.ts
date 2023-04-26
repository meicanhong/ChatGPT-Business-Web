import { NextRequest, NextResponse } from "next/server";
import { setToken, verifyToken } from "@/app/util/redis_util";

export async function GET(req: NextRequest) {
  const accessCode = req.headers.get("access-code");
  const result = await verifyToken(accessCode);
  if (result == false) {
    return NextResponse.json(
      {
        error: true,
        needAccessCode: true,
        msg: "Please go settings page and fill your access code.",
      },
      {
        status: 401,
      },
    );
  }
  return NextResponse.json({
    verify: result,
  });
}
