import {
  BasePaginatedResponse,
  BaseResponse,
} from '../responses/base.response';

export class BaseResponseMapper {
  static toBaseResponse<T>(value: T): BaseResponse<T> {
    return {
      data: value,
    };
  }

  static toBasePaginatedResponse<T>(
    value: T[],
    total?: number,
  ): BasePaginatedResponse<T> {
    return {
      data: value,
      total: total ?? value.length,
    };
  }
}
