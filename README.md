# RabbitMQ Order + Worker (Node.js)

This demo shows **how RabbitMQ helps process background jobs**:

- API accepts an order fast 🏎️\
- RabbitMQ stores the job 📬\
- Worker processes it later (simulated email) ⏳

This pattern is used for emails, notifications, billing, reports, etc.

---

## 🏗 Architecture

Client → **API (Producer)** → **RabbitMQ Queue** → **Worker (Consumer)**

- `index.js` = sends jobs to queue\
- `worker.js` = processes jobs from queue

---

## 🚀 Prerequisites

- RabbitMQ running (Docker recommended)

Start RabbitMQ:

```bash
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```

Dashboard:
http://localhost:15672

Login:
user: guest
pass: guest

---

## 📦 Install dependencies

```bash
npm install
```

---

## ▶️ Run the project

### 1️⃣ Start API (Producer)

```bash
node index.js
```

Runs at:
http://localhost:4000

---

### 2️⃣ Start Worker (Consumer)

Open another terminal:

```bash
node worker.js
```

Expected:

    📨 Worker waiting for jobs...

---

## 🧪 Test using cURL

Create an order:

```bash
curl -X POST http://localhost:4000/order   -H "Content-Type: application/json"   -d '{"email":"user@test.com","product":"Laptop"}'
```

API response:

```json
{ "message": "Order placed! Email will be sent soon." }
```

Worker output:

    📧 Sending email to user@test.com for product Laptop
    ✅ Email sent!

You can also see messages in the RabbitMQ dashboard under:

**Queues → email_queue**

---

## 🧠 RabbitMQ methods used (important)

Method Purpose

---

`createChannel()` open messaging channel
`assertQueue()` create/check queue
`sendToQueue()` push job/message
`consume()` receive jobs/messages
`ack()` confirm processing completed

These are the **core building blocks**.

---

## 🛑 Stop and remove RabbitMQ (optional)

```bash
docker stop rabbitmq && docker rm rabbitmq
```

---
