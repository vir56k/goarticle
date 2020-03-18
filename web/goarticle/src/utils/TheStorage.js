/**************************************************
* 概述： 本地化存储的一个包装类
* 使用方法：
* 1.引入
  import {TheLocalStorage,TheSessionStorage} from '../../common/TheStorage.js';
* 2. 调用
  var storage = new TheSessionStorage();
  //或者  var storage = new TheLocalStorage();
  storage.pirint();
*
* 方法概述：
*   pirint  打印
*   haskey(int index) 是否存在key
*   setItem(string key, string value)
*   getItem(string key)
*   removeItem(string key)
*   clear()
/**************************************************/

class TheStorage{

  constructor(storage){
    this.Storage = !storage || window.localStorage;
  }

  pirint(){
    var str = '';
    for(let i=0;i<this.Storage.length;i++){
      var key  = this.Storage.key(i);
      var val  = this.Storage.getItem(key);
      str+=`${key}=${val},`;
    }
    this.log(`the storage's data: { ${str} }`);
  }

  getStorage(){
    return this.Storage;
  }

  haskey(key){
    this.log(`haskey: ${key}`);
    return !!this.getStorage().getItem(key);
  }

  setItem(key,value){
    this.log(`setItem: ${key} = ${value}`);
    this.getStorage().setItem(key,value);
  }

  getItem(key){
    var val = this.getStorage().getItem(key);
    this.log(`getItem: ${key}=${val}`);
    return val;
  }

  removeItem(key){
    this.log(`removeItem:${key}`);
    this.getStorage().removeItem(key)
  }

  clear(){
    this.log(`clear`);
    this.getStorage().clear();
  }

  log(str){
    // console.log(str);
  }

}

export class TheLocalStorage extends TheStorage{
  constructor(){
    super(window.localStorage);
  }
}

export class TheSessionStorage extends TheStorage{
  constructor(){
    super(window.sessionStorage);
  }
}
