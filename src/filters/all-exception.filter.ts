import {
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';
import { Logger } from '@nestjs/common';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';

type MyResponseObj = {
  statusCode: number;
  timestamp: string;
  path: string;
  response: string | object;
};

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const myRespnseObj: MyResponseObj = {
      statusCode: HttpStatus.OK,
      timestamp: new Date().toISOString(),
      path: request.url,
      response: '',
    };

    if (exception instanceof HttpException) {
      myRespnseObj.statusCode = exception.getStatus();
      myRespnseObj.response = exception.getResponse();
    } else if (exception instanceof PrismaClientValidationError) {
      myRespnseObj.statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
      myRespnseObj.response = exception.message.replaceAll(/\n/g, '');
    } else {
      myRespnseObj.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      myRespnseObj.response = 'Internal Server Error';
    }

    response.status(myRespnseObj.statusCode).json(myRespnseObj);
    this.logger.error(
      `Status: ${myRespnseObj.statusCode}\nPath: ${myRespnseObj.path}\nResponse: ${JSON.stringify(myRespnseObj.response)}`,
      exception.stack,
    );

    super.catch(exception, host);
  }
}
