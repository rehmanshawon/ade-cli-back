import { Test, TestingModule } from '@nestjs/testing';
import { SysRolesService } from './sys_roles.service';

describe('SysRolesService', () => {
  let service: SysRolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SysRolesService],
    }).compile();

    service = module.get<SysRolesService>(SysRolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
