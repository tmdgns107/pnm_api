import { Controller, Post, Body } from "@nestjs/common";
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private  readonly userService: UserService) {}

  @Post()
  async createUser(@Body('id') id: string, @Body('email') email: string, @Body('image') image: string,
                   @Body('accessToken') accessToken: string, @Body('provider') provider: string): Promise<any> {
    return await this.userService.createUser(id, email, image, accessToken, provider);
  }

}
