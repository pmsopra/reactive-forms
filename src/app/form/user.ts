export class User {
    constructor(
        public firstName = '',
        public lastName = '',
        public email = '',
        public nickname = '',
        public age?: number) {

    }
}