// Crea un nuevo archivo src/models/User.ts con el contenido:
export interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
  created_at?: string;
  updated_at?: string;
}

// Crea un nuevo archivo src/models/PaymentMethod.ts con el contenido:
export interface PaymentMethod {
  id?: number;
  user_id: number;
  card_number: string;
  expiration_date: string;
  cvv: string;
  created_at?: string;
  updated_at?: string;
}

// Puedes crear más modelos en src/models según las tablas que uses en el backend.

// Para usar estos modelos, importa las interfaces en tus componentes o servicios.

// Ejemplo:
// import type { User } from '@/models/User';
// import type { PaymentMethod } from '@/models/PaymentMethod';

// Así tienes tipado fuerte para los objetos y respuestas de API.

// Este código es solo para definir tipos, no genera lógica ejecutable.
