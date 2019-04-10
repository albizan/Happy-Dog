import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/createUser.dto';

const mock = {
  async create(data: CreateUserDto): Promise<User> {
    const { name, email, password } = data;
    const user: User = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    return Promise.resolve(user);
  },
  save(user: User): Promise<User> {
    return Promise.resolve(user);
  },
};

const mockUserRepository = {
  provide: getRepositoryToken(User),
  useValue: mock,
};

describe('UserService', () => {
  let service: UserService;
  const data: CreateUserDto = new CreateUserDto();
  const { name, email, password } = data;
  const user: User = new User();
  user.name = name;
  user.email = email;
  user.password = password;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, mockUserRepository],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should return a User', () => {
      expect(service.createUser(data)).resolves.toEqual(user);
    });
  });

  describe('addUser', () => {
    it('should return the saved user', () => {
      expect(service.saveUser(user)).resolves.toEqual(user);
    });
  });
});
