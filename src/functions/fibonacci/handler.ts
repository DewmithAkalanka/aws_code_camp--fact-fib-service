import { successResponse, serverErrorResponse } from "@libs/api-gateway";
import { APIGatewayProxyEvent } from "aws-lambda";
import { fibonacci as fib } from "@ultirequiem/fibonacci";

const fibonacci = async (e: APIGatewayProxyEvent) => {
  const input = e.queryStringParameters?.number;

  const host = e.headers.Host;
  const baseURL = `https://${host}/dev`;

  if (input == null || input === "" || isNaN(Number(input))) {
    return serverErrorResponse({
      message: "Missing number parameter",
    });
  }

  const number = Number(input);

  if (number < 0 || number > 100) {
    return serverErrorResponse({
      message: "Number must be greater than 0 and less than 100",
    });
  }

  const fibonacci = await fib(number);

  return successResponse({
    input: input,
    fibonacci: fibonacci,
  });
};

export const main = fibonacci;
