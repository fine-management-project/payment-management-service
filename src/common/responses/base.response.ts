import { ApiProperty } from '@nestjs/swagger';

export class BaseResponse<T> {
  @ApiProperty({
    description: 'Any data passed from the application.',
    example: 'Object, array, string, number, etc.',
  })
  data!: T;
}

export class BasePaginatedResponse<T> {
  @ApiProperty({
    description: 'Any array data passed from the application.',
    example: 'Array of strings, array of numbers, array of objects, etc.',
  })
  data!: T[];

  @ApiProperty({
    description: 'The amount of entities, that can be retrieved.',
    example: '100',
  })
  total!: number;
}
