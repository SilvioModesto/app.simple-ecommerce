'use client'

import axios from 'axios';

function getFromLocalStorage(key:string) : any {
  const data = window.localStorage.getItem(key) || '';
  try {
    return JSON.parse(data);
  } catch (e) {
    return null;
  }
}

axios.interceptors.request.use(
  (config: any) => {
    const auth = ((getFromLocalStorage('user-store') || {}).state || {}).data;
    if (auth && auth.token && auth.token.length !== 0) {
      config.headers['Authorization'] = `Bearer ${auth.token}`;
    }

    return config;
  },
  (error) => {}
);
