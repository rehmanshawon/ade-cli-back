/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { promisify } from 'util';
import { isSingular, singular } from 'pluralize';
import { exec } from 'child_process';
import * as fs from 'fs';

@Injectable()
export class HelpersService {
  getPagination = (page, size) => {
    const limit = size ? +size : 100;
    const offset = page ? (page - 1) * limit : 0;

    return { limit, offset };
  };
  getPagingData = (data, page, limit, tableName) => {
    const { count: totalItems, rows: records } = data;
    const currentPage = page ? +page : 1;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, [tableName]: records, totalPages, currentPage };
  };

  createFile = async (
    path: string,
    fileName: string,
    data: string,
  ): Promise<void> => {
    if (!this.checkIfFileOrDirectoryExists(path)) {
      fs.mkdirSync(path);
    }

    const writeFile = promisify(fs.writeFile);

    return await writeFile(`${path}/${fileName}`, data, 'utf8');
  };

  checkIfFileOrDirectoryExists = (path: string): boolean => {
    return fs.existsSync(path);
  };

  async capitalizeFirstLetter(word: string) {
    const data = word.split('_');
    if (data.length > 1) {
      return data.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join('');
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  async uncapitalizeFirstLetter(word: string) {
    return word.charAt(0).toLowerCase() + word.slice(1);
  }

  async getTotalLine(fileName) {
    const data = fs.readFileSync(fileName).toString().split('\n');
    return data.length;
  }

  async splitFileTextByWord(fileName, splitWord) {
    const data = fs.readFileSync(fileName).toString().split(splitWord);
    return data;
    // data[1] has the model: line where we should add the model
    // divide data again to find the exact location
  }

  checkFileForAString(fileName, searchString) {
    const data = fs.readFileSync(fileName).toString();
    return data.includes(searchString);
  }

  async insertAtLine(fileName, lineNumber, textToWrite) {
    const data = fs.readFileSync(fileName).toString().split('\n');
    //console.log(data);
    data.splice(lineNumber, 0, textToWrite);
    //console.log(data);
    const text = data.join('\n');
    const writeFile = promisify(fs.writeFile);
    return await writeFile(fileName, text, 'utf8');
  }

  async getBelongsTo(fileName) {
    const result = [];
    const data = fs
      .readFileSync(fileName)
      .toString()
      .split('@BelongsTo(() => ');
    if (data.length === 2) {
      const data2 = data[1].split(')');
      result.push(data2[0]);
    }

    if (data.length > 2) {
      for (let i = 1; i < data.length; i++) {
        result.push(data[i].split(')')[0]);
      }
    }
    return result;
  }

  async getHasMany(fileName) {
    const data = fs.readFileSync(fileName).toString().split('@HasMany(() => ');
    if (data.length === 2) {
      const data2 = data[1].split(')');
      return data2[0];
    }
    const result = [];
    if (data.length > 2) {
      for (let i = 1; i < data.length; i++) {
        result.push(data[i].split(')')[0]);
      }
      return result;
    }
  }

  async getHasOne(fileName) {
    const data = fs.readFileSync(fileName).toString().split('@HasOne(() => ');
    if (data.length === 2) {
      const data2 = data[1].split(')');
      return data2[0];
    }
    const result = [];
    if (data.length > 2) {
      for (let i = 1; i < data.length; i++) {
        result.push(data[i].split(')')[0]);
      }
      return result;
    }
  }
  async returnSingularized(word: string) {
    if (isSingular(word)) {
      return word;
    } else {
      return singular(word);
    }
  }

  toSnakeCase(phrase: string) {
    return (
      phrase &&
      phrase
        .match(
          /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g,
        )
        .map((x) => x.toLowerCase())
        .join('_')
    );
  }

  treeData = (items: any[], id = 0, link = 'parent_menu') =>
    items
      .filter((item) => item[link] == id)
      .map((item) => ({
        ...item,
        id: +item.id,
        children: this.treeData(items, item.id),
      }));

  getMembers = (members) => {
    let children = [];

    return members
      .map((mem) => {
        const m = { ...mem }; // use spread operator
        if (m.children && m.children.length) {
          children = [...children, ...m.children];
        }
        delete m.children; // this will not affect the original array object
        return m;
      })
      .concat(children.length ? this.getMembers(children) : children);
  };
  flattenObject = (obj, parentKey = undefined) => {
    const flattened = {};

    Object.keys(obj).forEach((key) => {
      const value = obj[key];

      if (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value)
      ) {
        Object.assign(flattened, this.flattenObject(value, key));
      } else if (parentKey) {
        flattened[this.toSnakeCase(`${parentKey}`) + `__${key}`] = value;
      } else {
        flattened[key] = value;
      }
    });

    return flattened;
  };

  prefixEveryKeyOfObjectArray = (arr, prefixWord, prefixWith) => {
    const newArray = [];

    arr.forEach((obj) => {
      const newObj = {};
      const keys = Object.keys(obj);
      keys.forEach((key) => {
        Object.assign(newObj, { [prefixWord + prefixWith + key]: obj[key] });
      });
      newArray.push(newObj);
    });

    return newArray;
  };

  // prefixSpecificValueOfObjectArray(arr,keyValueToChange, prefixWord, prefixWith){
  //   const newArray = [];

  //   arr.forEach((obj) => {
  //     const newObj = {};
  //     const keys = Object.keys(obj);
  //     keys.forEach((key) => {
  //       if (key === keyValueToChange) {
  //         Object.assign(newObj, { [key]: obj[oldKey] });
  //       }
  //       Object.assign(newObj, { [prefixWord + prefixWith + key]: obj[key] });
  //     });
  //     newArray.push(newObj);
  //   });

  //   return newArray;
  // }
}
