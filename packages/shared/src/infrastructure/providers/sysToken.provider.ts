import { DOORMAN_CONSTANTS } from '../../domain/constants';
import { SysTokenAsyncContext, AsyncContext } from '../context';

export class SysTokenProvider {
  get(): SysTokenAsyncContext {
    const sys = AsyncContext.get<SysTokenAsyncContext>(DOORMAN_CONSTANTS.ASYNCCONTEXT.SYS_TOKEN);
    return (sys || {}) as SysTokenAsyncContext;
  }
}
