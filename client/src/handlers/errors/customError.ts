class CustomError extends Error {
  response: {
    data: { success: boolean; message: string };
    status: number;
  };

  constructor(response: {
    data: { success: boolean; message: string };
    status: number;
  }) {
    super();
    this.response = response;
  }
}

export default CustomError;
