/** @format */

import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
//
import { AppModule } from "./app.module";

async function bootstrap() {
	// define http frameware
	const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

	// prefig
	app.setGlobalPrefix("v1");

	// valid
	app.useGlobalPipes(new ValidationPipe());

	// swagger
	const swaggerConfig = new DocumentBuilder()
		.addBearerAuth()
		.setTitle("Academy Api")
		.setDescription("The academy API description")
		.setVersion("1.0")
		.addTag("Academy")
		.build();
	const document = SwaggerModule.createDocument(app, swaggerConfig);
	SwaggerModule.setup("api", app, document);

	// on server
	await app.listen(3000);
}
bootstrap();
