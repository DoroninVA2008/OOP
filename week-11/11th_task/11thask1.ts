import { User } from '../1 Utility_Types'

type UserEditForm = Partial<User> & { id: User['id'] };