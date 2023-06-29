import clientPromise from "../../lib/mongodb";

export default async function getProducts(_req: any, res: any) {
  try {
    const client = await clientPromise;
    const db = client.db("fakeShop");

    const products = await db.collection("products").find({}).toArray();

    res.json(products);
  } catch (e) {
    console.error(e);
  }
}
