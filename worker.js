import amqp from "amqplib";

async function startWorker() {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  const QUEUE = "order_notify_to_user";

  await channel.assertQueue(QUEUE);

  console.log("📨 Worker waiting for jobs...");

  channel.consume(QUEUE, (msg) => {
    const order = JSON.parse(msg.content.toString());

    console.log(
      `📧 Sending email to ${order.email} for product ${order.product}`
    );

    setTimeout(() => {
      console.log("✅ Email sent!");
      channel.ack(msg);
    }, 2000);
  });
}

startWorker();
