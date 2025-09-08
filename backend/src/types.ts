declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly DB_HOST: string;
      readonly DB_PORT: string;
      readonly DB_NAME: string;
      readonly DB_USER: string;
      readonly DB_PASSWORD: string;
      readonly NODE_ENV: "development" | "production";
      readonly PORT: string;
    }
  }
}

interface ContactDetail {
  street: string;
  city: string;
  postalCode: string;
  landlinePhone: string | null;
  cellPhone: string | null;
  email: string | null;
}

export type {
  ContactDetail
};