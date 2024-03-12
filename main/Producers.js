import amqplib from "amqplib";
import * as dotenv from "dotenv";
dotenv.config();
export class Producer {
  channel;
  async createNewChannel() {
    const connection = await amqplib.connect(process.env.RABBIT_HOST);
    this.channel = await connection.createChannel();
  }
  async publishNewMessage(routing_key, message) {
    if (!this.channel) {
      await this.createNewChannel();
    }
    const exchange_name = process.env.RABBIT_EXCHANGE;
    await this.channel.assertExchange(exchange_name, "direct");
    const logDetails = {
      logType: routing_key,
      message: message,
      created_at: new Date(),
    };
    await this.channel.publish(
      exchange_name,
      routing_key,
      Buffer.from(JSON.stringify(logDetails))
    );
    console.log("this is message" + message + "from" + exchange_name);
  }
}
