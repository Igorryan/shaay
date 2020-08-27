import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

interface ITokenPayload {
  isAdmin: boolean;
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAdminAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('JWT token is missing');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub, isAdmin } = decoded as ITokenPayload;

    if (!isAdmin) {
      throw new Error('is not admin');
    }

    request.headers = {
      id: sub,
    };

    return next();
  } catch {
    throw new Error('Invalid JWT token');
  }
}
