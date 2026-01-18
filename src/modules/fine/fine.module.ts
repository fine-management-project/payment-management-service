import { Module } from '@nestjs/common';
import { FineManagementServiceModule } from 'src/integrations/fine-management-service/fine-management-service.module';
import { FineService } from './fine.service';

@Module({
  imports: [FineManagementServiceModule],
  providers: [FineService],
  exports: [FineService],
})
export class FineModule {}
