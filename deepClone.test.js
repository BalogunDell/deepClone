const { deepClone } = require('./deepClone');
const { noArgs, argNotAnObject, invalidOrEmptyObject } = require('./messages');


const object = {
  name: 'Barris',
  school: {
    name: 'University of Canada',
    getAge: () => 25,
    location: {
      state: 'Canada',
      phoneNumber: '032394935',
      securityContacts: [
        { name: 'Bright', ward: 'A', phoneNumber: '9659443932'},
        { name: 'Mary', ward: 'M', phoneNumber: '9659443933'},
        { name: 'Collins', ward: 'C', phoneNumber: '9659443934'},
        { name: 'Pressy', ward: 'P', phoneNumber: '9659443935'}
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  }
}

describe('Deep Clone Function', () => {
  test('function is called without an argument', (done) => {
    const functionResult = deepClone();
    expect(functionResult).toEqual(noArgs);
    done();
  });

  test('function is called with other structures than an object',
     (done) => {
      const functionResult = deepClone(1);
      expect(functionResult).toEqual(argNotAnObject);
      done();
  });

  test('function is called with invalid object',
     (done) => {
      const functionResult = deepClone({});
      expect(functionResult).toEqual(invalidOrEmptyObject);
      done();
  });

  test('object third level is deep cloned/copy',(done) => {
      const cloned = deepClone(object);
      cloned.school.name = 'Indiana University';
      cloned.securityContacts = [{ contactName: 'Changed name', ward: 'A'}]
      const { school: { location: { securityContacts }, name }} = cloned;
      expect(name).not.toEqual(object.school.name);
      expect(securityContacts.length).not.toEqual(object.school.location.securityContacts.length);
      done();
  });

  test('object function values is/are not lost',(done) => {
    const cloned = deepClone(object);
    expect(cloned.school.getAge()).toBe(25);
    done();
  });

  test('object function are modified in cloned object but not referenced in original object',(done) => {
    const cloned = deepClone(object);
    cloned.school.getAge = () => 'my name is Delight.';
    expect(cloned.school.getAge()).toBe('my name is Delight.');
    expect(object.school.getAge()).toBe(25);
    done();
  });

});