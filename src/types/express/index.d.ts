import { User } from '@prisma/client'; // Assuming you have a User type from Prisma

// Extend the Request interface from express
declare module 'express-serve-static-core' {
  interface Request {
    user?: User | null; // Allow user to be null initially
  }
}
