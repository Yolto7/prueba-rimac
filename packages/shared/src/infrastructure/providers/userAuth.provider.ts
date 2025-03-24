import { RIMAC_CONSTANTS } from '../../domain/constants';
import { RequestAsyncContext, UserAuthInfo, AsyncContext } from '../context';

export class UserAuthProvider {
  get(): UserAuthInfo {
    const traceContext = AsyncContext.get<RequestAsyncContext>(
      RIMAC_CONSTANTS.ASYNCCONTEXT.REQUEST
    );

    return (traceContext?.user || {}) as UserAuthInfo;
  }
}
