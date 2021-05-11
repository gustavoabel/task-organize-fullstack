import { NextFunction, Request, Response } from "express";
import Controller from "./Controller";
import User from "../schemas/User";

class UserController extends Controller {
  constructor() {
    super("user");
  }

  protected initRoutes(): void {
    this.router.get(this.path, this.list);
  }

  private async list(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const users = await User.find();

    return res.send(users);
  }
}

export default UserController;
