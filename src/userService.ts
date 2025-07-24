import axios from 'axios';
import type { User } from '@/User';

const API_BASE = 'https://x8ki-letl-twmt.n7.xano.io/api:qYnceosv/productos';

export async function getUsers(): Promise<User[]> {
  const res = await axios.get(API_BASE);
  return res.data;
}

export async function getUser(id: number): Promise<User> {
  const res = await axios.get(`${API_BASE}/${id}`);
  return res.data;
}

export async function createUser(user: User): Promise<User> {
  const res = await axios.post(API_BASE, user);
  return res.data;
}

export async function updateUser(id: number, user: Partial<User>): Promise<User> {
  const res = await axios.patch(`${API_BASE}/${id}`, user);
  return res.data;
}

export async function deleteUser(id: number): Promise<void> {
  await axios.delete(`${API_BASE}/${id}`);
}