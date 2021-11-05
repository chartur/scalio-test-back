import {Controller, Get, HttpStatus, Param, Res} from '@nestjs/common';
import {PostsService} from "./posts.service";
import { Response } from 'express';
import {FindOneParams} from "../validators/find-one.validator";

@Controller('posts')
export class PostsController {

  constructor(
    private postsService: PostsService
  ) {
  }

  @Get()
  getAll(@Res() res: Response) {
    const posts = this.postsService.findAll();
    res.status(HttpStatus.OK).json(posts);
  }

  @Get(':id')
  async getOne(@Param() params: FindOneParams, @Res() res: Response) {
    await new Promise(resolve => {
      setTimeout(resolve, 5000)
    });
    try {
      const post = this.postsService.findOneByIdOrFail(+params.id);
      return res.status(HttpStatus.OK).json(post);
    } catch (e) {
      res.status(HttpStatus.NOT_FOUND).json({
        message: e.message
      });
    }
  }
}
