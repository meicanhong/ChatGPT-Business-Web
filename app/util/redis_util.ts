import { createClient } from "redis";

const client = createClient({
  url: "redis://10.60.132.45:6379",
});
client.on("error", (err) => console.log("Redis Client Error", err));

export async function verifyToken(key: string | null) {
  await client.connect();
  if (key == null) {
    await client.disconnect();
    return false;
  }
  const value = await client.get(key);
  await client.disconnect();
  return value != null;
}

export async function setToken(key: string, days: number = 1) {
  await client.connect();
  await client.setEx(key, days * 24 * 60 * 60, key);
  await client.disconnect();
  return key;
}
