export interface API {
  name: string;
  description: string;
  version: string;
  added: string;
  updated: string;
  url: string;
  category: string;
  logo?: string;
  contact?: {
    name?: string;
    url?: string;
    email?: string;
  };
  openapiVersion: string;
  swaggerUrl: string;
  swaggerYamlUrl: string;
  externalDocs?: {
    url: string;
  };
}

export interface APIListResponse {
  apis: API[];
  total: number;
  page: number;
  pageSize: number;
}

export interface APIsGuruAPI {
  added: string;
  preferred: string;
  versions: {
    [version: string]: {
      added: string;
      info: {
        title: string;
        version: string;
        description?: string;
        contact?: {
          name?: string;
          url?: string;
          email?: string;
        };
        'x-logo'?: {
          url: string;
        };
      };
      swaggerUrl: string;
      swaggerYamlUrl: string;
      updated: string;
      externalDocs?: {
        url: string;
      };
      openapiVer?: string;
    };
  };
}

export interface APIsGuruResponse {
  [apiId: string]: APIsGuruAPI;
} 