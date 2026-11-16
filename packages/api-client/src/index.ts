import { ApiResponse, ApiErrorResponse } from '@ecobazar/types';

export interface ApiClientConfig {
  baseUrl: string;
  getAccessToken?: () => string | null | Promise<string | null>;
  getOrganizationId?: () => string | null;
  getBranchId?: () => string | null;
}

export class EcobazarClient {
  private baseUrl: string;
  private getAccessToken?: () => string | null | Promise<string | null>;
  private getOrganizationId?: () => string | null;
  private getBranchId?: () => string | null;

  constructor(config: ApiClientConfig) {
    this.baseUrl = config.baseUrl.replace(/\/$/, '');
    this.getAccessToken = config.getAccessToken;
    this.getOrganizationId = config.getOrganizationId;
    this.getBranchId = config.getBranchId;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}/${endpoint.replace(/^\//, '')}`;
    const headers = new Headers(options.headers || {});

    if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
      headers.set('Content-Type', 'application/json');
    }

    if (this.getAccessToken) {
      const token = await this.getAccessToken();
      if (token && !headers.has('Authorization')) {
        headers.set('Authorization', `Bearer ${token}`);
      }
    }

    if (this.getOrganizationId) {
      const orgId = this.getOrganizationId();
      if (orgId && !headers.has('X-Organization-Id')) {
        headers.set('X-Organization-Id', orgId);
      }
    }

    if (this.getBranchId) {
      const branchId = this.getBranchId();
      if (branchId && !headers.has('X-Branch-Id')) {
        headers.set('X-Branch-Id', branchId);
      }
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      const errorResponse = data as ApiErrorResponse;
      throw new Error(
        errorResponse.error?.message || `API request failed with status ${response.status}`
      );
    }

    return data as ApiResponse<T>;
  }

  // Health check endpoint
  async getHealth(): Promise<
    ApiResponse<{ status: string; timestamp: string; version: string; uptime: number }>
  > {
    return this.request('health');
  }
}

export function createApiClient(config: ApiClientConfig): EcobazarClient {
  return new EcobazarClient(config);
}
