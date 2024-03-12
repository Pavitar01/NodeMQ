import amqplib from "amqplib";
import * as dotenv from "dotenv";
dotenv.config();
export const consumeNewMessage = async () => {
  const connection = await amqplib.connect(process.env.RABBIT_HOST);
  const channel = await connection.createChannel();
  const exchange_name = process.env.RABBIT_EXCHANGE;
  await channel.assertExchange(exchange_name,"direct");
  const queue = await channel.assertQueue("InfoQueue");
  await channel.bindQueue(queue.queue, exchange_name, "info");
  channel.consume(queue.queue, (message) => {
    const data = JSON.parse(message.content);
    console.log(data);
    //when consume successfully
    channel.ack(message);
  });
};

consumeNewMessage()