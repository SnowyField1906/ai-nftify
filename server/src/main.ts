import { join } from "path";
import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { Logger, ValidationPipe } from "@nestjs/common";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { AppModule } from "./app.module";
import { PATH_GRPC_FOLDER } from "./grpc";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const grpc_port = configService.get("grpc_port");
  const host = configService.get("host");
  // Grpc Config
  const internal_app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: "p2p",
      protoPath: [
        join(PATH_GRPC_FOLDER, `/common.proto`)
      ],
      url: `${host}:${grpc_port}`,
    },
  });

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const port = configService.get<number>("port");
  await app.listen(port);
  await internal_app.listen();
  Logger.log(`🚀 Listening HTTP at http://0.0.0.0:${port}`, "HTTP");
  Logger.log(`🚀 Listening GRPC at http://0.0.0.0:${grpc_port}`, "GRPC");
}
bootstrap();
