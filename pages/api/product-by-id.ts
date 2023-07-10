import clientPromise from "../../lib/mongodb";

export default async function getProductById(_req: any, res: any) {
  try {
    const client = await clientPromise;
    const db = client.db("fakeShop");
    const id = +_req.query.id;
    const product = await db
      .collection("products")
      .findOne({ internal_id: id });

    res.json(product);
  } catch (e) {
    console.error(e);
  }
}
