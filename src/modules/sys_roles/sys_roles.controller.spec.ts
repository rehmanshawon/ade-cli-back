import { Test, TestingModule } from '@nestjs/testing';
import { SysRolesController } from './sys_roles.controller';

describe('SysRolesController', () => {
  let controller: SysRolesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SysRolesController],
    }).compile();

    controller = module.get<SysRolesController>(SysRolesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
