import { MiddlewareObj } from '@middy/core';
import { JwtPayload, jwtDecode } from 'jwt-decode';

import { AppError, ErrorTypes } from '../../domain/error';
import { AxiosClientFactory } from '../axios';
import { Logger } from '../../domain/logger';
import { SysTokenAsyncContext } from '../context';

interface Config {
  IDENTITIES_API_BASE_URL: string;
  RIMAC_SYS_USER_EMAIL: string;
  RIMAC_SYS_USER_PASSWORD: string;
  RIMAC_SYS_TOKEN_REFRESH_TIME: number;
}

export class SysTokenMiddleware {
  private readonly axios;
  private static tokenData: SysTokenAsyncContext | null = null;

  constructor(
    private readonly config: Config,
    private readonly logger: Logger
  ) {
    this.axios = AxiosClientFactory.getClient({
      baseUrl: this.config.IDENTITIES_API_BASE_URL,
    });
  }

  private async fetchSysToken(): Promise<SysTokenAsyncContext> {
    const { data } = await this.axios.post(`/internal/login`, {
      email: this.config.RIMAC_SYS_USER_EMAIL,
      password: this.config.RIMAC_SYS_USER_PASSWORD,
    });

    const decoded: JwtPayload = jwtDecode(data.data.accessToken as string),
      expiresAt = (decoded.exp as number) * 1000;

    this.logger.info(`SysLogin token created, expires at: ${new Date(expiresAt).toISOString()}`);
    return {
      accessToken: data.data.accessToken,
      expiresAt,
    };
  }

  private async getCachedSysToken(): Promise<SysTokenAsyncContext> {
    if (
      !SysTokenMiddleware.tokenData ||
      SysTokenMiddleware.tokenData.expiresAt - Date.now() < this.config.RIMAC_SYS_TOKEN_REFRESH_TIME
    ) {
      SysTokenMiddleware.tokenData = await this.fetchSysToken();
    }

    return SysTokenMiddleware.tokenData;
  }

  getSysToken(context?: SysTokenAsyncContext): Promise<SysTokenAsyncContext> {
    SysTokenMiddleware.tokenData = context || null;
    return this.getCachedSysToken();
  }

  use(): MiddlewareObj {
    return {
      before: async (handler) => {
        try {
          const { accessToken } = await this.getCachedSysToken();
          Object.assign(handler.context, {
            sysTokenAsyncContext: {
              accessToken,
            },
          });
        } catch (error: any) {
          this.logger.error(`Error in SysTokenMiddleware of sysLogin: ${JSON.stringify(error)}`);
          throw new AppError(
            ErrorTypes.BAD_REQUEST,
            'Identity could not be resolved',
            'ERR_IDENTITY_UNRESOLVED'
          );
        }
      },
    };
  }
}
