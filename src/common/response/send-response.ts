export class SendResponse {
  static success(data: any, msg = '') {
    const result = {
      code: 200,
      success: true,
      data: data,
      msg: msg,
    };
    return result;
  }
}
