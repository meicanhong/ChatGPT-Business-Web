const redis = require('redis');
const client = redis.createClient();

client.on("error", (error: any) => {
    console.error("Redis Error: ", error);
});

async function isConnect() {
    if (!client.isOpen) {
        await client.connect();
    }
}

export async function verifyTaaoken(token: string|null) {
    console.log('token', token)
    await isConnect()
    console.log('token', token)
    try {
        if (token === null) {
            return false;
        }
        const result = await client.get(token);
        if (result === null) {
            return false;
        }
        return true;
    } catch (error) {
        console.error("Error occurred when verifying token: ", error);
        return false;
    }
}

export async function storeToken(token: string) {
    await isConnect()
    try {
        await client.set(token, token);
    } catch (error) {
        console.error("Error occurred when storing token: ", error);
    }
}