import axios from 'axios';

// JSONデータの送受信を主とするAPIリクエスト用のaxiosインスタンス
export const jsonAxiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 2000,
  withCredentials: true,
});

// ファイルアップロードなど、multipart/form-dataを扱うAPIリクエスト用のaxiosインスタンス
export const formDataAxiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  timeout: 2000,
  withCredentials: true,
});
