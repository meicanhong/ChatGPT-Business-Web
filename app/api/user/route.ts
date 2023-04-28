import { NextRequest, NextResponse } from "next/server";
import { setToken } from "@/app/util/redis_util";
const crypto = require("crypto");

export async function GET(req: NextRequest) {
  const password = req.nextUrl.searchParams.get("password");
  // 随机生成一个 hash key
  const key = Math.random().toString(36);

  const hash = crypto.createHash("sha256");
  hash.update(key);
  const result = hash.digest("hex").substring(0, 20);

  console.log(result);

  if (password != process.env.PASSWORD) {
    return NextResponse.json({
      error: "Authentication failed",
    });
  }
  const value = await setToken(result);
  return NextResponse.json({
    api_key: value,
  });
}
