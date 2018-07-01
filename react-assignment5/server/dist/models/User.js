/*
id++
type- "user"
Age- number
name- string
password- hash
parent- [number]

 */
class User {
    constructor(name, password, age) {
        this.getName = () => {
            return this.name;
        };
        this.setName = (name) => {
            this.name = name;
        };
        this.getAge = () => {
            return this.age;
        };
        this.setAge = (age) => {
            this.age = age;
        };
        this.getPassword = () => {
            return this.age;
        };
        this.setPassword = (Password) => {
            this.Password = Password;
        };
        this.addParent = (id) => {
            this.parent.push(id);
        };
        this.removeParent = (id) => {
            let index = this.parent.findIndex(i => i);
        };
        let today = new Date();
        this.id = Math.abs(today.getTime());
        this.type = 'user';
        this.name = name;
        this.age = age;
        this.password = password;
        this.parent = [];
    }
}
//# sourceMappingURL=User.js.map