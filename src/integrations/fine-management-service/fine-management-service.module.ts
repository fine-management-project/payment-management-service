import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { FineManagementServiceService } from './fine-management-service.service';

@Module({
  imports: [HttpModule],
  providers: [FineManagementServiceService],
  exports: [FineManagementServiceService],
})
export class FineManagementServiceModule {}
