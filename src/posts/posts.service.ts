import {Injectable} from "@nestjs/common";
import {PostModel} from "./post.model";
import POST_DB from "../db/posts.db";
@Injectable()
export class PostsService {
  private readonly data: PostModel[] = [];

  constructor() {
    this.data = POST_DB
  }

  findAll(): PostModel[] {
    return [
      ...this.data
    ];
  }

  findOneByIdOrFail(id: number): PostModel {
    const post = this.data.find(p => p.id === id);
    if(!post) {
      throw new Error('Post not found!');
    }

    if(!post.id || !post.body || !post.title) {
      throw new Error('Invalid Post data!');
    }

    return post;
  }
}
