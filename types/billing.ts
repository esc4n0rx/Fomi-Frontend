export interface Plan {
    id: 'fomi_simples' | 'fomi_duplo' | 'fomi_supremo';
    name: string;
    price: number | 'free';
    description: string;
    features: string[];
    isFree?: boolean;
    isPopular?: boolean;
  }
  
  export interface Subscription {
    id: string;
    plano: string;
    status: 'active' | 'canceled' | 'past_due' | 'incomplete' | 'trialing';
    current_period_start: string;
    current_period_end: string;
    trial_end?: string;
    canceled_at?: string;
    active: boolean;
  }
  
  export interface Invoice {
    id: string;
    numero_fatura: string;
    status: 'paid' | 'open' | 'void' | 'draft';
    total: number;
    currency: string;
    period_start: string;
    period_end: string;
    due_date: string;
    paid_at?: string;
    hosted_invoice_url: string;
    invoice_pdf: string;
    created_at: string;
  }
  
  export interface BillingData {
    subscription?: Subscription;
    invoices: Invoice[];
  }
  
  export interface CreateSubscriptionRequest {
    plan: 'fomi_duplo' | 'fomi_supremo';
    success_url: string;
    cancel_url: string;
  }
  
  export interface CreateSubscriptionResponse {
    success: boolean;
    message: string;
    data: {
      checkout_url: string;
      session_id: string;
    };
  }
  
  export interface CreatePortalRequest {
    return_url: string;
  }
  
  export interface CreatePortalResponse {
    success: boolean;
    message: string;
    data: {
      portal_url: string;
    };
  }