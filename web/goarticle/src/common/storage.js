import { TheLocalStorage } from '../utils/TheStorage.js';

global.storage = new TheLocalStorage();

console.log('# storage 加载完成。');
