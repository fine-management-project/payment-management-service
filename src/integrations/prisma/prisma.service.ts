import { Inject, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { LOGGER_SERVICE } from 'src/common/shared/constants';
import { ILoggerService } from 'src/common/logger/logger.types';

export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(
    @Inject(LOGGER_SERVICE) private readonly loggerService: ILoggerService,
  ) {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);

    super({ adapter });

    setTimeout(() => {
      this.loggerService.setContext(this.constructor.name);
    }, 0);
  }

  onModuleInit() {
    this.$connect()
      .then(() => {
        this.loggerService.info({
          message: 'Prisma client is connected!',
        });
      })
      .catch((e) => {
        this.loggerService.error({
          message: 'Prisma is not connected',
          description: e,
        });
      });
  }
}
