import clientPromise from "../../lib/mongodb";

export default async function getProducts() {
  try {
    const client = await clientPromise;
    const db = client.db("fakeShop");
    const products = await db.collection("products").find({}).toArray();
    return products;
  } catch (e) {
    console.error(e);
  }
}
