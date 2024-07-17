class CustomError extends Error {
  response: {
    data: {
      success: boolean;
      message: string;
      errors?: { field: string; message: string }[];
    };
    status: number;
  };

  constructor(response: {
    data: {
      success: boolean;
      message: string;
      errors?: { field: string; message: string }[];
    };
    status: number;
  }) {
    super();
    this.response = response;
  }
}

export default CustomError;

// class FormValidationError extends CustomError {
//   response: {
//     data: {
//       errors: [{ fields: string; message: string }];
//     };
//   };

//   constructor(response: {
//     data: {
//       success: boolean;
//       message: string;
//       errors: [{ fields: string; message: string }];
//     };
//     status: number;
//   }) {
//     super();
//     this.response = response;
//   }
// }
