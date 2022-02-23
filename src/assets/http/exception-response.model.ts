/**
 * 响应体统一数据实体
 */
export class ExceptionResponse {
  constructor(
    public path: string,
    public timestamp: string,
    public extend?: any
  ) {}
}
