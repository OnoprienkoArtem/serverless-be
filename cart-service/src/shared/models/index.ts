import { Request } from 'express';

import { User } from '../../api/users';

export interface AppRequest extends Request {
  user?: User
}
