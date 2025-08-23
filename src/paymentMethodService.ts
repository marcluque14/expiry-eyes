import axios from 'axios';
import type { PaymentMethod } from '@/PaymentMethod';

const API_BASE = 'https://x8ki-letl-twmt.n7.xano.io/api:cT810lfj/paymentmethods';

export async function getPaymentMethods(): Promise<PaymentMethod[]> {
  const res = await axios.get(API_BASE);
  return res.data;
}

export async function getPaymentMethod(id: number): Promise<PaymentMethod> {
  const res = await axios.get(`${API_BASE}/${id}`);
  return res.data;
}

export async function createPaymentMethod(paymentMethod: PaymentMethod): Promise<PaymentMethod> {
  const res = await axios.post(API_BASE, paymentMethod);
  return res.data;
}

export async function updatePaymentMethod(id: number, paymentMethod: Partial<PaymentMethod>): Promise<PaymentMethod> {
  const res = await axios.patch(`${API_BASE}/${id}`, paymentMethod);
  return res.data;
}

export async function deletePaymentMethod(id: number): Promise<void> {
  await axios.delete(`${API_BASE}/${id}`);
}