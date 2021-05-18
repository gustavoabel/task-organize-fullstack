import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import Controller from "./Controller";
import User from "../schemas/User";
import ValidationService from "../services/ValidationService";
import HttpStatusCode from "../responses/HttpStatusCode";
import ServerErrorException from "../errors/ServerErrorException";
import IdInvalidException from "../errors/IdInvalidException";
import NoContentException from "../errors/NoContentException";
import HttpException from "../errors/HttpException";
import responseCreate from "../responses/ResponseCreate";
import responseOk from "../responses/ResponseOk";


class UserController extends Controller {
  constructor() {
    super("/user");
  }

  protected initRoutes(): void {
    this.router.get(this.path, this.list);
    this.router.get(`${this.path}/:id`, this.findById);
    this.router.post(this.path, this.create);
    this.router.put(`${this.path}/:id`, this.edit);
    this.router.delete(`${this.path}/:id`, this.delete);
  }

  private async list(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const users = await User.find();

      if(users.length) return responseOk(res, users);
      next(new NoContentException());
    } catch (error) {
      next(new ServerErrorException(error))
      //return res.send(new HttpException(HttpStatusCode.INTERNAL_SERVER_ERROR, 'Erro interno servidor'))
    }
  }

  private async findById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { id } = req.params;

      if (ValidationService.validateId(id, next)) return;
        return res
          .status(HttpStatusCode.BAD_REQUEST)
          .send(new IdInvalidException());

      const user = await User.findById(id);
      if (user) return responseOk(res, user);
      return res.send(responseOk(res, user));
      next(new NoContentException());
    } catch (error) {
      next(new ServerErrorException(error));
      //return res.send(new ServerErrorException(error));
    }
  }

  private async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const user = await User.create(req.body);

      return responseCreate(res, user);
    } catch (error) {
      next(new ServerErrorException(error));
    }
  }

  private async edit(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { id } = req.params;
      if (ValidationService.validateId(id, next)) return;
        return res
          .status(HttpStatusCode.BAD_REQUEST)
          .send(new IdInvalidException());
      const user = await User.findByIdAndUpdate(id, req.body, () => {});
      if(user) return responseOk(res, user);

      next(new NoContentException());

      //return res.send(responseOk(res, user));
    } catch (error) {
      next(new ServerErrorException(error));
    }
  }

  private async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { id } = req.params;
      if (ValidationService.validateId(id, next)) return;
        return res
          .status(HttpStatusCode.BAD_REQUEST)
          .send(new IdInvalidException());
      const user = await User.findById(id);
      if (user) {
        user.deleteOne();
        return responseOk(res, user);
      }
      next(new NoContentException());
    } catch (error) {
      next(new ServerErrorException(error));
    }
  }
}

export default UserController;
