import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';
import { SortingDirection } from 'src/common/value-objects/sorting-options.vo';

export class PaginationOptionsDto {
  @ApiProperty({
    description: 'Limit',
    example: '10',
  })
  @IsInt({ message: 'Limit must be an integer!' })
  limit?: number;

  @ApiProperty({
    description: 'Offset',
    example: '10',
  })
  @IsInt({ message: 'Offset must be an integer!' })
  offset?: number;
}

export class SortingOptionsDto<T extends string> {
  @ApiProperty({
    description: 'Key',
    example: 'id',
  })
  @IsString({ message: 'Key must be a string!' })
  key: T;

  @ApiProperty({
    description: 'Sorting direction',
    example: 'ASC / DESC',
  })
  @IsString({ message: 'Sorting direction must be ASC or DESC!' })
  direction: SortingDirection;
}
