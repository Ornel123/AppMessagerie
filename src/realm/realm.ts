/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Realm from 'realm';

// schema de la base de données objet
const UserSchema = {
  name: 'User',
  properties: {
    _id: 'int',
    email: 'string',
    password: 'string',
  },
  primaryKey: '_id',
};

//utilisation de realm pour interragir avec la base de données
const realm = await Realm.open({
  path: 'myrealm',
  schema: [UserSchema],
});
