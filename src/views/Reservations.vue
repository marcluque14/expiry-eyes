<file name=src/models/User.ts>
export interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
  created_at?: string;
  updated_at?: string;
}
</file>

<file name=src/models/PaymentMethod.ts>
export interface PaymentMethod {
  id?: number;
  user_id: number;
  card_number: string;
  expiration_date: string;
  cvv: string;
  created_at?: string;
  updated_at?: string;
}
</file>
