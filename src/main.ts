import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { InternalServerErrorException } from "@nestjs/common";

const noEnvException = (env_name: string) =>
  new InternalServerErrorException(
    `No '${env_name}' environment variable was found!`,
  );

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3000;
  const app_url = process.env.APP_URL;
  const web_url = process.env.WEB_URL;
  if (!app_url) throw noEnvException("APP_URL");
  if (!web_url) throw noEnvException("WEB_URL");

  app.enableCors({ origin: [app_url, web_url], credentials: true });
  await app.listen(port);
}
bootstrap();
