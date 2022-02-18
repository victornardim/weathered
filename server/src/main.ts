import { Logger } from '@nestjs/common';
import { App } from './app';

const PORT = process.env.SERVER_PORT || 5000;

const logger = new Logger('NestApplication');

async function bootstrap() {
  const app = await App.get();
  await app.listen(PORT, () => {
    logger.log(`Nest application listening on port ${PORT}`);
  });
}
bootstrap();
