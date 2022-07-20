// import { successResponse, serverErrorResponse } from "@libs/api-gateway";
// import { APIGatewayProxyEvent } from "aws-lambda";

// const fibonacci = async (e: APIGatewayProxyEvent) => {
//   const input = e.queryStringParameters?.number;

//   if (input == null || input === "" || isNaN(Number(input))) {
//     return serverErrorResponse({
//       message: "Missing number parameter",
//     });
//   }

//   const number = Number(input);

//   if (number < 0 || number > 100) {
//     return serverErrorResponse({
//       message: "Number must be greater than 0 and less than 100",
//     });
//   }

//   const fibonacci = await calculateFibonacci(number);

//   return successResponse({
//     input: input,
//     fibonacci: fibonacci,
//   });
// };
