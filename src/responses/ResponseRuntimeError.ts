import { Response } from 'express';
import HttpStatusCode from "./HttpStatusCode";


function responseRuntimeError(res:Response, status: HttpStatusCode, message: string){
    const error = true;
    const body = {};


    return res.status(status).send({
        status, message, error, body,
    });
} 

export default responseRuntimeError;