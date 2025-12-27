import { HttpException, Injectable, HttpStatus } from '@nestjs/common';

const JSONPLACEHOLDER_BASE_URL = 'https://jsonplaceholder.typicode.com';

@Injectable()
export class PostsService {
  async findAll() {
    try {
      const response = await fetch(`${JSONPLACEHOLDER_BASE_URL}/posts`);

      if (!response.ok) {
        throw new HttpException(
          'Failed to fetch posts from JSONPlaceholder',
          HttpStatus.BAD_GATEWAY,
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to fetch posts',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    try {
      const response = await fetch(`${JSONPLACEHOLDER_BASE_URL}/posts/${id}`);

      if (!response.ok) {
        if (response.status === 404) {
          throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
        }
        throw new HttpException(
          'Failed to fetch post from JSONPlaceholder',
          HttpStatus.BAD_GATEWAY,
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to fetch post',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
