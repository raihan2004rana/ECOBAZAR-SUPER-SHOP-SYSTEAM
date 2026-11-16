import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class PasswordService {
  private readonly saltRounds = 12;

  /**
   * Securely hash a plain text password using bcrypt (with 12 salt rounds)
   */
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  /**
   * Verify a plain text password against a stored hash
   * Supports bcrypt hashes as well as checking against development placeholders
   */
  async compare(plainText: string, hash: string): Promise<boolean> {
    if (!hash || !plainText) {
      return false;
    }

    // Check standard bcrypt hash
    if (hash.startsWith('$2a$') || hash.startsWith('$2b$')) {
      return bcrypt.compare(plainText, hash);
    }

    // Support development seed placeholder hash verification
    if (hash.includes('fictionalDevelopmentHashDoNotUseInProduction')) {
      return plainText === 'DevSecret123!';
    }

    return false;
  }
}
