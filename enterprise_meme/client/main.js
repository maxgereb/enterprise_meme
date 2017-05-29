Router.route('/', function () {
  this.render('index');
});

Router.route('/index', function () {
  this.render('index');
});

Router.route('/register', function () {
  this.render('register');
});

Router.route('/start', function () {
  this.render('start');
});

UserList = new Mongo.Collection('users');
// UserList.index({username: "text", userpassword: "text"});

if (Meteor.isClient) {
  Template.index.events({
    'click #registerButton': function() {
      Router.go('/register');
    },

    'submit form': function() {
      event.preventDefault();

      // var name = event.target.loginName.value;
      // var password = event.target.loginPassword.value;

      Router.go('/start');
    }


  });

  Template.register.events({
    'click #backIndex': function() {
      Router.go('/index');
    },

    'submit form': function() {
      event.preventDefault();

      var name = event.target.registerName.value;
      var mail = event.target.registerMail.value;
      var password = event.target.registerPassword.value;
      var confirmPassword = event.target.registerConfirmPassword.value;

      if (name == '') {
        document.getElementById('noNameError').setAttribute('class', 'alert alert-danger show-alert');
        return;
      } else {
        document.getElementById('noNameError').setAttribute('class', 'alert alert-danger hide-alert');
      }

      if (mail == '') {
        document.getElementById('noMailError').setAttribute('class', 'alert alert-danger show-alert');
        return;
      } else {
        document.getElementById('noMailError').setAttribute('class', 'alert alert-danger hide-alert');
      }

      if (password == '') {
        document.getElementById('noPasswordError').setAttribute('class', 'alert alert-danger show-alert');
        return;
      } else {
        document.getElementById('noPasswordError').setAttribute('class', 'alert alert-danger hide-alert');
      }

      if (confirmPassword == '') {
        document.getElementById('noConfirmPasswordError').setAttribute('class', 'alert alert-danger show-alert');
        return;
      } else {
        document.getElementById('noConfirmPasswordError').setAttribute('class', 'alert alert-danger hide-alert');
      }

      if (password != confirmPassword) {
        document.getElementById('passwordMatchError').setAttribute('class', 'alert alert-danger show-alert');
        return;
      } else {
        document.getElementById('passwordMatchError').setAttribute('class', 'alert alert-danger hide-alert');
      }

      UserList.insert({username: name, usermail: mail, userpasword: password});

      document.getElementById('registrationSuccess').setAttribute('class', 'alert alert-success show-alert');
    }
  });
}
