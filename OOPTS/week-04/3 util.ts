interface User {
  id: number;
  name: string;
  email: string;
  passwordHash: string;
}
type UserPreview = Pick<User, 'id' | 'name' | 'email'>;
// UserPreview = { id: number; name: string; email: string; }

type PublicUser = Omit<User, 'passwordHash'>;
// PublicUser = { id: number; name: string; email: string; }

type AppLocale = 'en' | 'ru';
type Translations = Record<AppLocale, string>;
const greetings: Translations = { en: 'Hello', ru: 'Привет' };