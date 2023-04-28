import { createClient } from "redis";

const client = createClient({
  url: "redis://redis:6379",
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

export async function setToken(key: string) {
  await client.connect();
  await client.set(key, key);
  await client.disconnect();
  return key;
}
