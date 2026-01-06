import express from "express";
import amqp from "amqplib";
const app = express();

app.use(express.json());

const connection = await amqp.connect("amqp://localhost");
const channel = await connection.createChannel();
await channel.assertQueue("email_queue");

app.get("/health", (req, res) => {
  return res.send({
    msg: "Running the server",
  });
});

app.post("/order", (req, res) => {
  const order = {
    id: Date.now(),
    email: req.body.email || "test@example.com",
    product: req.body.product || "Sample Product",
  };

  channel.sendToQueue(
    "order_notify_to_user",
    Buffer.from(JSON.stringify(order))
  );

  console.log("✔️ Job added to queue:", order);
  res.json({ message: "Order placed! Email will be sent soon." });
});

app.listen(4000, async () => {
  console.log("API running on http://localhost:4000");
});
