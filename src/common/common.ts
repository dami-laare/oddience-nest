import { v4 as uuidV4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { HEADERS } from './constants';
import { Request } from 'express';
import { JwtPayload } from 'src/tenant/dto/tenant.enum';
import { UnauthorizedException } from '@nestjs/common';

export const generateApiKey: () => Promise<string> = async () => {
  const apiKey: string = uuidV4();

  return apiKey;
};

export const hashString: (str: string) => Promise<string> = async (str) => {
  const hashedStr: string = await bcrypt.hash(str, 11);

  return hashedStr;
};

/**
 *
 * @param exp Time it will take the JWT to expire expressed in SECONDS
 * @param payload Payload to include in the the token signature
 * @returns
 */

export const signJwt: (
  exp: number,
  payload: JwtPayload,
) => Promise<string> = async (exp, payload) => {
  const token = await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: exp,
    issuer: process.env.JWT_ISSUER,
  });

  return token;
};

export const getBearerTokenFromHeaders: (headers: any) => null | string = (
  headers,
) => {
  const authorizationHeader = headers[HEADERS.AUTHORIZATION] as string;
  if (!authorizationHeader) {
    return null;
  }

  if (!authorizationHeader.startsWith('Bearer ')) {
    return null;
  }

  const bearerToken = authorizationHeader.split(' ')[1];

  return bearerToken;
};

export const validateJwt: (
  req: Request,
  allowedRoles: string[],
) => JwtPayload | null = (req, allowedRoles) => {
  const token = getBearerTokenFromHeaders(req.headers);

  try {
    const decoded: JwtPayload | null = jwt.verify(
      token,
      process.env.JWT_SECRET,
      {
        issuer: process.env.JWT_ISSUER,
      },
    );

    if (!allowedRoles.includes(decoded.role)) {
      return null;
    }

    return decoded;
  } catch (err) {
    throw new UnauthorizedException();
  }
};
