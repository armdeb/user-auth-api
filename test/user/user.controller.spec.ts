import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../../src/user/user.controller';
import { UserService } from '../../src/user/user.service';
import { CreateUserDto } from '../../src/user/dto/create-user.dto';
import { UpdateUserDto } from '../../src/user/dto/update-user.dto';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockUsersService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    findOneByEmail: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      await controller.findAll();
      expect(mockUsersService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user by ID', async () => {
      await controller.findOne('mockid');
      expect(mockUsersService.findOne).toHaveBeenCalledWith('mockid');
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = { email: 'test@example.com', password: 'password', username: 'testuser' };
      await controller.create(createUserDto);
      expect(mockUsersService.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto: UpdateUserDto = { username: 'updateduser' };
      await controller.update('mockid', updateUserDto);
      expect(mockUsersService.update).toHaveBeenCalledWith('mockid', updateUserDto);
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      await controller.delete('mockid');
      expect(mockUsersService.delete).toHaveBeenCalledWith('mockid');
    });
  });
});
