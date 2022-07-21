import { successResponse, serverErrorResponse } from "@libs/api-gateway";
import { APIGatewayProxyEvent } from "aws-lambda";

const factorial = async (e: APIGatewayProxyEvent) => {
  console.log(e.queryStringParameters?.number);
  const input = e.queryStringParameters?.number;

  if (input == null || input === "" || isNaN(Number(input))) {
    return serverErrorResponse({
      message:
        "Missing number parameter, Please provide `/?number=<number>` after word `factorial` in URL",
    });
  }

  const number = Number(input);

  if (number < 0 || number > 100) {
    return serverErrorResponse({
      message: "Number must be greater than 0 and less than 100",
    });
  }

  const factorial = await calculateFactorial(number);

  return successResponse({
    input: input,
    factorial: factorial,
  });
};

const calculateFactorial = async (number: number) => {
  if (number === 0) {
    return 1;
  }

  return number * (await calculateFactorial(number - 1));
};

export const main = factorial;
