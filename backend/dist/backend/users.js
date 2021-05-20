"use strict";
exports.__esModule = true;
var User = /** @class */ (function () {
    function User(email, name, password) {
        this.email = email;
        this.name = name;
        this.password = password;
    }
    User.prototype.matches = function (another) {
        return another !== undefined &&
            another.email === this.email &&
            another.password === this.password;
    };
    return User;
}());
exports.User = User;
exports.users = {
    "leandro@mail.com": new User('leandro@mail.com', 'Leandro', 'leandro19'),
    "liliane@mail.com": new User('liliane@mail.com', 'Liliane', 'liliane05')
};
//# sourceMappingURL=users.js.map