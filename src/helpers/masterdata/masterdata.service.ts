/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SysAttributes } from 'src/modules/sys_attributes/sys_attributes.model';
import { SysRoleTable } from 'src/modules/sys_role_table/sys_role_table.model';
import { SysTables } from 'src/modules/sys_tables/sys_tables.model';
import { HelpersService } from '../helpers/helpers.service';
import { MDCreateTableDto } from './dto/md-create-table.dto';
import { promisify } from 'util';
import { exec } from 'child_process';
import * as fs from 'fs';
import {
  D_BOOL,
  D_DATE,
  D_INT,
  D_STRING,
  D_UUID,
  S_BOOL,
  S_DATE,
  S_ENUM,
  S_INT,
  S_STRING,
  S_UUID,
  T_BOOL,
  T_DATE,
  T_NUMBER,
  T_STRING,
  T_UUID,
} from '../constants/constants';

@Injectable()
export class MasterDataService {
  constructor(
    @InjectModel(SysTables) private sysTables: typeof SysTables,
    @InjectModel(SysAttributes) private sysAttributes: typeof SysAttributes,
    @InjectModel(SysRoleTable) private sysRoleTable: typeof SysRoleTable,
    private helpers: HelpersService,
  ) {}

  async createModel(createTableDto: MDCreateTableDto) {
    const belongsTo = [];
    const has = [];
    let data = `/* eslint-disable prettier/prettier */\n`;
    data += `import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey, BelongsTo, HasMany, HasOne, BelongsToMany } from 'sequelize-typescript';\n`;
    let primaryKeyString = `\t@Column({primaryKey: true, autoIncrement: true,type: ${D_INT}})
\t@Index({name: "PRIMARY", using: "BTREE", order: "ASC", unique: true})
\tid?: number;\n`;
    let generalColumnString = '';
    let importModelString = '';
    let foriegnTableImportModelString = '';
    let foreignTableForeignKeyString = '';

    let foreignKeyString = '';
    let belongsToString = '';
    // these columns will be added to the foreign table
    let HasManyString = '';
    let HasOneString = '';
    let belongsToManyString = '';
    type updateFileData = {
      modelName: string;
      modelFile: string;
      importString: string;
      hasString: string;
    };
    let enumDefinitionString = '';
    let enumColumnString = '';
    const updateForeignModelStructure: updateFileData[] = [];
    const { tableName, fieldList } = createTableDto;
    const modulePath = `src/modules/${tableName}`;
    if (!this.helpers.checkIfFileOrDirectoryExists(modulePath)) {
      fs.mkdirSync(modulePath);
    }
    const modelName = await this.helpers.capitalizeFirstLetter(tableName);
    // check if any key is a primary key.
    for (let i = 0; i < fieldList.length; i++) {
      const fieldType = await this.returnColumnFieldType(fieldList[i].type);
      const fieldName = fieldList[i].field;
      //       if (fieldList[i].primaryKey) {
      //         //const primaryKey = fieldList[i].field;
      //         const primaryKey = 'id';
      //         primaryKeyString += `\t@Column({primaryKey: true, autoIncrement: true,type: ${D_INT}})
      // \t@Index({name: "PRIMARY", using: "BTREE", order: "ASC", unique: true})
      // \t${primaryKey}?: number;\n`;
      //         continue;
      //       }
      // primary key is done. now lets add the foreign key columns
      //check if any field is foreign key
      // if it is, then import the reference model from the reference table
      if (fieldList[i].foreignKey) {
        // now the reference has all the relationship info
        const foreignTable = fieldList[i].reference.right_table;
        const foreignModel = await this.helpers.capitalizeFirstLetter(
          foreignTable,
        );
        const foreignKey = fieldList[i].reference.right_table_key;
        const thisTable = fieldList[i].reference.left_table;
        const thisModel = await this.helpers.capitalizeFirstLetter(thisTable);
        const thisTableKey = fieldList[i].reference.left_table_key;

        // so there is a module in the src path under same name
        // and there is a model under same name in the model folder inside module folder
        importModelString += `import { ${foreignModel} } from 'src/modules/${foreignTable}/${foreignTable}.model';\n`;
        // import adding is done
        // now check the relationship style.
        // firstcheck if it's one to many
        if (fieldList[i].reference.relation.toLowerCase() === '1:n') {
          // console.log('202', fieldList[i].reference);
          foreignKeyString += `
\t@ForeignKey(() => ${foreignModel})
\t@Column({                                  
\ttype: ${fieldType}
\t})
\t${thisTableKey}?: ${fieldList[i].type};\n`;
          belongsToString += `
\t@BelongsTo(() => ${foreignModel})
\t${await this.helpers.returnSingularized(foreignModel)}?: ${foreignModel};\n`;
          belongsTo.push(foreignModel); // for inclusion in sequelize crud service
          // we now have to modify the foreign table also to reflect the association with this table
          // first import this table to foreign model file

          foriegnTableImportModelString = `import { ${thisModel} } from 'src/modules/${thisTable}/${thisTable}.model';\n`;
          // now define the column that will indicate the association
          HasManyString = `
\t@HasMany(() => ${thisModel})
\t${thisTable}?: ${thisModel}[];\n`;
          has.push(thisModel); // for inclusion in crud service
          const foreignModelFilePath = `src/modules/${foreignTable}/${foreignTable}.model.ts`;
          // lets push the foreign model update data for later file writing

          updateForeignModelStructure.push({
            modelName: foreignModel,
            modelFile: foreignModelFilePath,
            importString: foriegnTableImportModelString,
            hasString: HasManyString,
          });
        } // 1:N relatioship is done
        if (fieldList[i].reference.relation.toLowerCase() === '1:1') {
          // in this case foreignKey atttribute should be added before the primaryKey column
          const tempStr = primaryKeyString;
          primaryKeyString = `@ForeignKey(() => ${foreignModel})\n`;
          primaryKeyString += tempStr;
          // now define the belongs to assosiation
          belongsToString += `
          @BelongsTo(() => ${foreignModel})
          ${await this.helpers.returnSingularized(
            foreignModel,
          )}?: ${foreignModel};\n`;
          belongsTo.push(foreignModel);
          // we now have to modify the foreign table also to reflect the association with this table
          // first import this table to foreign model file
          foriegnTableImportModelString += `import { ${thisModel} } from 'src/modules/${thisTable}/${thisTable}.model';\n`;
          // add the primary key of this model to foreign model
          foreignTableForeignKeyString = `
          @Column({            
            type: DataType.INTEGER 
          })
          @Index({
            name: "${foreignTable}_${thisTable}_${thisTableKey}_fk",
            using: "BTREE",
            order: "ASC",
            unique: false 
          })
          ${thisTableKey}!: number;\n`;
          // defing hasone association
          HasOneString += `
          @HasOne(() => ${thisModel})
          ${await this.helpers.returnSingularized(
            thisTable,
          )}?: ${thisModel};\n`;
          has.push(thisModel);

          const foreignModelFilePath = `src/modules/${foreignTable}/${foreignTable}.model.ts`;
          // lets push the foreign model update data for later file writing

          updateForeignModelStructure.push({
            modelName: foreignModel,
            modelFile: foreignModelFilePath,
            importString: foriegnTableImportModelString,
            hasString: foreignTableForeignKeyString + HasOneString,
          });
          // we need to update the foreign table right now, because the
          // foreign key may point to a different table
          if (
            !this.helpers.checkFileForAString(
              `src/modules/${foreignTable}/${foreignTable}.model.ts`,
              `${thisTable}.model`,
            )
          ) {
            await this.helpers.insertAtLine(
              `src/modules/${foreignTable}/${foreignTable}.model.ts`,
              1,
              foriegnTableImportModelString,
            );
            const foreignModelFileTotalLine = await this.helpers.getTotalLine(
              `src/modules/${foreignTable}/${foreignTable}.model.ts`,
            );
            await this.helpers.insertAtLine(
              `src/modules/${foreignTable}/${foreignTable}.model.ts`,
              foreignModelFileTotalLine - 2,
              HasOneString,
            );
          }
          //done
        }
        if (fieldList[i].reference.relation.toLowerCase() === 'm:n') {
          // console.log('202', fieldList[i].reference);
          foreignKeyString += `
\t@ForeignKey(() => ${foreignModel})
\t@Column({                                  
\ttype: ${fieldType}
\t})
\t@Index({
\nname: "PRIMARY",
\tusing: "BTREE",
\torder: "ASC",
\tunique: true 
\t})
\t${foreignKey}?: ${fieldList[i].type};\n`;
          const joinTable = fieldList[i].reference.join_table;
          const joinModel = await this.helpers.capitalizeFirstLetter(joinTable);
          // we now have to modify the foreign table also to reflect the association with this table
          // first import this table to foreign model file
          foriegnTableImportModelString = `import { ${thisModel} } from 'src/modules/${thisTable}/${thisTable}.model';\n`;
          foriegnTableImportModelString += `import { ${joinModel} } from 'src/modules/${joinTable}/${joinTable}.model';\n`;
          // now define the column that will indicate the association
          belongsToManyString = `
\t@BelongsToMany(() => ${joinModel}, () => ${thisModel})
\t${joinTable}?: ${joinModel}[];\n`;
          // we need to update the foreign table right now, because the
          // foreign key may point to a different table
          await this.helpers.insertAtLine(
            `src/modules/${foreignTable}/${foreignTable}.model.ts`,
            1,
            foriegnTableImportModelString,
          );
          const foreignModelFileTotalLine = await this.helpers.getTotalLine(
            `src/modules/${foreignTable}/${foreignTable}.model.ts`,
          );
          await this.helpers.insertAtLine(
            `src/modules/${foreignTable}/${foreignTable}.model.ts`,
            foreignModelFileTotalLine - 2,
            belongsToManyString,
          );
        } // 1:N relatioship is done
        // we will skip the many-to-many relationship for now

        continue;
      }
      if (fieldList[i].enum) {
        enumDefinitionString += `export const ${
          fieldList[i].enum.enumName
        }Types = [${fieldList[i].enum.enumValues.map(
          (val) => "'" + val + "'",
        )}];`;
        enumColumnString += `
  \t@Column(DataType.ENUM({ values: ${fieldList[i].enum.enumName}Types }))
  \t${fieldName}${fieldList[i].optional ? '?' : '!'}: string;\n`;
        continue;
      }
      // we will process the other fields for the moment
      // the fieldlist field is neither primary nor foreign key. therefore, it's a normal field
      const requiredTypeString = fieldList[i].optional ? '?' : '!';
      const uniqueColumnString = fieldList[i].unique
        ? 'unique: true'
        : 'unique: false';
      generalColumnString += `
\t@Column({type: ${fieldType}, ${uniqueColumnString}})
\t${fieldName}${requiredTypeString}: ${fieldList[i].type};\n`;
    }
    const mandatoryColumnString = `
    \t@Column({type: ${D_BOOL}})
\tis_active!: boolean;

\t@Column({type: ${D_INT}})
\tcreated_by?: number;

\t@Column({type: ${D_INT}})
\tupdated_by?: number;

\t@Column({type: ${D_DATE}})
\tcreated_at!: Date;

\t@Column({type: ${D_DATE}})
\tupdated_at?: Date;

\t@Column({type: ${D_DATE}})
\tdeleted_at?: Date;\n`;
    // lets process model information for this table
    data += importModelString;
    data += enumDefinitionString;
    const tableDecorationString = `\n\t@Table({tableName: '${tableName}',timestamps: false,comment: ""})\n`;

    data += tableDecorationString;
    const exportModelString = `\texport class ${modelName} extends Model {\n`;

    data += exportModelString;

    data += primaryKeyString;
    data += generalColumnString;
    data += enumColumnString;
    data += mandatoryColumnString;
    data += foreignKeyString;
    data += belongsToString;

    const modelCloserString = `
    }\n`;
    data += modelCloserString;

    // the data variable now has everything for the model file of this table
    // let's create a module folder under the same name, and write the model file inside it.
    // if (!this.helpers.checkIfFileOrDirectoryExists(tableName)) {
    //   fs.mkdirSync(tableName);
    // }
    const newModel = await this.helpers.createFile(
      `src/modules/${tableName}/`,
      `${tableName}.model.ts`,
      data,
    );
    const result = await this.helpers.getBelongsTo(
      `src/modules/${tableName}/${tableName}.model.ts`,
    );

    await this.addModelToApp(tableName);
    for (let i = 0; i < result.length; i++) {
      await this.addModelToApp(result[i]);
    }

    for (let j = 0; j < updateForeignModelStructure.length; j++) {
      // we need to update the foreign models also
      if (
        !this.helpers.checkFileForAString(
          updateForeignModelStructure[j].modelFile,
          `${tableName}.model`,
        )
      ) {
        await this.helpers.insertAtLine(
          updateForeignModelStructure[j].modelFile,
          1,
          updateForeignModelStructure[j].importString,
        );
        const foreignModelFileTotalLine = await this.helpers.getTotalLine(
          updateForeignModelStructure[j].modelFile,
        );
        await this.helpers.insertAtLine(
          updateForeignModelStructure[j].modelFile,
          foreignModelFileTotalLine - 2,
          updateForeignModelStructure[j].hasString,
        );
      }
    }
    return result;
  }

  async addModelToApp(tableName: string) {
    const modelToAdd = await this.helpers.capitalizeFirstLetter(tableName);
    const fileName = 'src/app.module.ts';
    const modelPath = `src/modules/${await this.helpers.toSnakeCase(
      tableName,
    )}/${await this.helpers.toSnakeCase(tableName)}.model`;
    const importString = `import {${modelToAdd}} from '${modelPath}';\n`;
    const splitter = 'models: [';

    const data = await this.helpers.splitFileTextByWord(fileName, splitter);
    if (data[0].includes(modelPath) === false)
      await this.helpers.insertAtLine(fileName, 1, importString);
    if (data[1].includes(modelToAdd)) return true;
    const data2 = await this.helpers.splitFileTextByWord(fileName, splitter);
    const temp = splitter + modelToAdd + ',';
    const finalData = data2[0] + temp + data2[1];
    const writeFile = promisify(fs.writeFile);
    await writeFile(fileName, finalData, 'utf8');
  }

  async returnColumnFieldType(field: string) {
    switch (field) {
      case T_NUMBER:
        return D_INT;
      case T_STRING:
        return D_STRING;
      case T_BOOL:
        return D_BOOL;
      case T_DATE:
        return D_DATE;
      case T_UUID:
        return D_UUID;
      default:
        return null;
    }
  }
}
