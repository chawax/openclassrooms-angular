import { Subject } from 'rxjs';
import { User } from '../models/user.model';

export class UserService {
  users: User[] = [
    {
      firstname: 'Olivier',
      lastname: 'Thierry',
      email: 'othierry@asi.fr',
      drinkPreference: 'bière',
      hobbies: ['photo', 'football'],
    },
  ];

  userSubject = new Subject<User[]>();

  emitUsers() {
    this.userSubject.next(this.users.slice());
  }

  addUser(user: User) {
    this.users.push(user);
    this.emitUsers();
  }
}
