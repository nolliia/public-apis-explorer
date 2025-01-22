export interface API {
  name: string;
  description: string;
  auth: string;
  https: boolean;
  cors: string;
  url: string;
  category: string;
}

export interface APIListResponse {
  apis: API[];
  total: number;
  page: number;
  pageSize: number;
} 