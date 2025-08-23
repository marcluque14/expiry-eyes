export interface PaymentMethod {
    id?: number;
    user_id: number;
    card_number: string;
    card_holder_name: string;
    expiration_date: string;
    cvv?: string;
    created_at?: string;
    updated_at?: string;
  }