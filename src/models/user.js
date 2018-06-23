let _users = {}

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

class User {
  constructor(id, username, email, password) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
  }

  static findById(id) {
    return new User(id, _users[id].username,
      _users[id].email, "");
  }

  static findByEmail(email) {
    for (var key in _users) {
      if (_users[key].email == email)
        return new User(key, _users[key].username,
          _users[key].email, _users[key].password);
    }
    return null;
  }

  static create(input) {
    if (User.findByEmail(input.email))
      return null;

    var id = makeid();
    _users[id] = input;
    return new User(id, _users[id].username,
      _users[id].email, _users[id].password);
  }
}

module.exports.User = User;
