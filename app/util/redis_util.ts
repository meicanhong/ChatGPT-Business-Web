import { createClient } from "redis";
import { User } from "@/app/api/user/user";

const client = createClient({
  url: "redis://10.60.132.45:6379",
});
client.on("error", (err) => console.log("Redis Client Error", err));

export async function verifyToken(key: string | null) {
  try {
    await client.connect();
    console.log("[Danny Debug] key", key);
    if (key == null) {
      return false;
    }
    const value = await client.get(key);
    console.log("[Danny Debug] value", value);
    if (value == null) {
      return false;
    }
    const user: User = JSON.parse(value);
    console.log("[Danny Debug] User", user);
    user.balance = user.balance - 1;
    // await client.setEx(key, user.days, JSON.stringify(user));
    if (user.balance < 0) {
      return false;
    }
    return value != null;
  } finally {
    await client.disconnect();
  }
}

export async function initUser(key: string, value: string, days: number = 1) {
  await client.connect();
  await client.setEx(key, days * 24 * 60 * 60, value);
  await client.disconnect();
  return key;
}
