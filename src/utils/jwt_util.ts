import jwt, { SignOptions, VerifyErrors } from 'jsonwebtoken';
import util from 'util';
import 'dotenv/config';
import { User, UserToken } from '../types/auth-types';

const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables.');
}

const JWT_SECRET_KEY = JWT_SECRET as string;

const verify = util.promisify<string, string, jwt.VerifyOptions, UserToken>(jwt.verify);
const sign = util.promisify<string | Buffer | object, string, SignOptions, string>(jwt.sign);

const asyncJWT = {
    verifyAuthToken,
    signAuthToken
};

function verifyAuthToken(authToken: string): Promise<UserToken> {
    return verify(authToken, JWT_SECRET_KEY, {});
}

function signAuthToken(payload: User): Promise<string> {
    return sign(payload, JWT_SECRET_KEY, { expiresIn: '7d' });
}

export default asyncJWT;