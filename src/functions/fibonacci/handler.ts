import { successResponse, serverErrorResponse } from "@libs/api-gateway";
import { APIGatewayProxyEvent } from "aws-lambda";
import { fibonacci as fib } from "@ultirequiem/fibonacci";
import axios from "axios";

const fibonacci = async (e: APIGatewayProxyEvent) => {
  const input = e.queryStringParameters?.number;

  const host = e.headers.Host;
  const baseURL = `http://${host}/dev`;

  //Fibonacci Calculation
  if (input == null || input === "" || isNaN(Number(input))) {
    return serverErrorResponse({
      message: "Missing number parameter",
    });
  }

  const number = Number(input);

  if (number < 0 || number > 100) {
    return serverErrorResponse({
      message: "Number must be greater than 0 and less than 150",
    });
  }

  const fibonacci = await fib(number);
  let factorialValue: any;

  try {
    const factorial = await axios.get(`${baseURL}/factorial/?number=${number}`);
    factorialValue = factorial.data.factorial;
  } catch (error) {
    return serverErrorResponse({
      message: "Connecting to Factorial API failed!" + error,
    });
  }

  return successResponse({
    input: input,
    fibonacci: fibonacci,
    factorialValue,
  });
};

export const main = fibonacci;
