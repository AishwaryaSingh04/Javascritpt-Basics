/**
	There are three ways by which design patterns can be done.
	1.Creational Patterns
	2.
	3.
*/

/**
Creational Design Patterns
*/

/************************************************************************************************************************************
	1.Constructor Pattern- The use of new keyword create an object, this new keyword links the object to the Object prototype.
							It also binds 'this' keyword to new object scope.A constructor can consist of param along with function.
							The new keyword implicitly add a return and therefore it return the whole object with the param passed(if any)
							
**************************************************************************************************************************************/

function DummyConstructor(param1, param2) {
  this.param1 = param1;
  this.param2 = param2;
  this.toSring = function () {
    return this.param1 + this.param2;
  }; //--> implicit return
}

/**
    Prototypes -Its a way by which object inherit properties from another object.The basic structure is 
                Classname.prototype.methodName = function(){}
*/

var Task = function (name) {
  this.name = name;
  this.completed = false;

  this.complete = function () {
    return "Hi" + this.name;
  };
};

Task.prototype.save = function () {
  return "bye";
};

var task1 = new Task("aish");
console.log(task1);

/**
 * Object for task1
 * Task {name: "aish", complete: ƒ}
    complete: ƒ ()
    arguments: null
    caller: null
    length: 0
    name: ""
prototype: {constructor: ƒ}
__proto__: ƒ ()
    [[FunctionLocation]]: VM83:3
    [[Scopes]]: Scopes[2]
  name: "aish"
__proto__:
  save: ƒ ()  ========> SAVE is present in proto of the object
  constructor: ƒ (name)
  __proto__: Object
 */

/**
 * CLASSES - ECMASCRIPT15 introduces the concept of classes to create objects.
 *           The constructor now take place of the function above
 */

class Task {
  constructor(name) {
    this.name = name;
    this.completed = false;
  }

  complete() {
    return "Hi" + this.name;
  }

  save() {
    return "Bye";
  }
}

/***************************************************************************************************************************************************
 * 2. MODULE Pattern - Provide Encaosulation Method.
 *                  The difference between constructor and module pattern is that in module pattern we can do task related to single type.
 ****************************************************************************************************************************************************/

/**
 * As an Object Literal- It consist of methods in key value form
 *                       moduleName.method name can be used to invoke the method
 */

var Module = {
  method: function () {},
  nextmethod: function () {},
};

/**
 * Wrapping the module inside function
 */

var Module = function () {
  var private = "I am private";
  return {
    method: function () {},
    nextmethod: function () {},
  };
};

/***********************************************************************************************************************************************
 * Factory Pattern - Simplifies Object Creationn
 *                    Creating different Object on need
 *                    Repository Creation
 *
 * A factory pattern is useful when you need to abstract the creation of an object from its actual implementation
 *************************************************************************************************************************************************/

/*
 * Below is an example to illustrate the same
 * Here we have three different repositories i.e task repository, user repository and project repository
 * */

var Task = require("./task");
var taskRepo = require("./taskRepository");
var userRepo = require("./userRepository");
var projectRepo = require("./projectRepository");

var task1 = new Task(taskRepo.get(1));
var user = userRepo.get(1);
var project = projectRepo.get(1);

task1.user = user;
task1.project = project;

task1.save();

/**
 * Here we have three different kind of repositories
 * so we can use factory pattern to create these repositories for us
 * Following is example of factory pattern
 */

var repoFactory = function () {
  this.getRepo = function (repoType) {
    if (repoType === "task") {
      var taskRepo = require("./taskRepository");
      return taskRepo;
    }
    if (repoType === "user") {
      var userRepo = require("./userRepository");
      return userRepo;
    }
    if (repoType === "project") {
      var projectRepo = require("./projectRepository");
      return projectRepo;
    }
  };
};

Module.exports = new repoFactory();

/**
 * Now you dont need to call different repository in the main file
 * You can call the repo factory and it will create required object for you
 *
 * Below is the code how to use the factory pattern
 *
 */

var repoFactory = require("./repoFactory");

var task1 = new Task(repoFactory.getRepo("task").get(1));
var task2 = new Task(repoFactory.getRepo("task").get(2));

var user = repoFactory.getRepo("user").get(1);
var project = repoFactory.getRepo("project").get(1);

/**
 * we can make
 * Here this refers to object scope for repo factory
 * The re
 */

var repoFactory2 = function () {
  var repos = this;
  var repoList = [
    { name: "task", source: "./taskRepository" },
    { name: "user", source: "./userRepository" },
    { name: "project", source: "./projectRepository" },
  ];

  repoList.forEach((repo) => {
    repos[repo.name] = require(repo.source)();
  });
};

module.exports = new repoFactory2();

/**
 *
 */

var repoFactory = require("./repoFactory2");

/**********************************************************************************************************************
 * 4.Singleton - Used to restrict an object to one instance of that object across the application
 *******************************************************************************************************************************/
