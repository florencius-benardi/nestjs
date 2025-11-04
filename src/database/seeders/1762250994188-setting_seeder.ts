import { MigrationInterface, QueryRunner } from 'typeorm';
import {
  ATTR_COLUMN_SETTING,
  ATTR_TABLE_SETTING,
  Settings,
} from '../entities/setting.entity';
import {
  TYPE_SETTING_CONS,
  VALUE_SETTING_CONS,
} from '../../app/commons/constants/type-setting.constant';

export class SettingSeeder1762250994188 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const dataArr: Partial<Record<string, any>[]> = [
        {
          key: 'COMPANY_LOGO',
          name: 'COMPANY LOGO',
          type: TYPE_SETTING_CONS.WEB,
          column_type: VALUE_SETTING_CONS.UPLOAD,
          options: null,
          reference: null,
          value: 'test',
          created_by_id: 1,
          updated_by_id: 1,
        },
        {
          key: 'COMPANY_ICON',
          name: 'COMPANY ICON',
          type: TYPE_SETTING_CONS.WEB,
          column_type: VALUE_SETTING_CONS.UPLOAD,
          options: null,
          reference: null,
          value: 'test',
          created_by_id: 1,
          updated_by_id: 1,
        },
      ];

      for (const da of dataArr) {
        await queryRunner.manager
          .findOne(Settings, {
            where: {
              [ATTR_COLUMN_SETTING.CHAR_KEY]: da.key ?? '',
            },
          })
          .then(async (result) => {
            if (!result) {
              await queryRunner.manager.insert(Settings, da);
            }
          });
      }

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM ${ATTR_TABLE_SETTING}`);
  }
}
