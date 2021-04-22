import { getCustomRepository, Repository } from "typeorm";
import { Setting } from "../entities/Setting";
import { SettingsRepository } from "../repositories/SettingsRepository";

interface ICreateSetting {
  username: string;
  chat: boolean;
}

class SettingsService {
  private settingsRepository: Repository<Setting>;

  constructor() {
    this.settingsRepository = getCustomRepository(SettingsRepository);
  }

  async create({ chat, username }: ICreateSetting): Promise<Setting> {
    const userAlreadyExists = await this.settingsRepository.findOne( {
      username,
    });

    if (userAlreadyExists) {
      throw new Error('user already exists!')
    }
  
    const setting = this.settingsRepository.create({
      username,
      chat,
    });
  
    await this.settingsRepository.save(setting);

    return setting;
  }

  async findByUsername(username: string): Promise<Setting> {
    const setting = await this.settingsRepository.findOne({
      username,
    });

    return setting;
  }

  async update(username: string, chat: boolean): Promise<void> {
    const setting = await this.settingsRepository
      .createQueryBuilder()
      .update(Setting)
      .set({ chat })
      .where('username = :username', {
        username,
      })
      .execute();
  }
}

export { SettingsService };