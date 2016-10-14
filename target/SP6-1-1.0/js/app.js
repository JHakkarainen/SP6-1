var app = angular.module("Person", ["ngRoute"]);

app.config( function ($routeProvider) {
        $routeProvider
                .when("/allpersons", {
                    templateUrl: "views/allpersons.html",
                    controller: "GetAllController"
                })
                .when("/newperson", {
                    templateUrl: "views/newperson.html",
                    controller: "PersonController"
                })

                .when("/:id", {
                    templateUrl: "views/personDetail.html",
                    controller: "GetController"
                })

                .when("/", {
                    redirectTo: "/"
                });
    });
//End of route provider

app.factory('PersonFactory', function () {

    var persons = [{id: 1, name: "Jens", age: 18},
        {id: 2, name: "Peter", age: 23},
        {id: 3, name: "Hanne", age: 23}];
    
//    var getAll = function() {
//        return persons;
//      };
    
    
    return {
      getAll: function() {
        return persons;
          }
      };
});

app.controller("PersonController", ['$scope','PersonFactory', function (PersonFactory, $scope) {

        $scope.persons = PersonFactory.getAll;
        console.log("Persons works");

        var nextId = 4;

        var addPerson = function (newperson) {
            if (newperson.id === null) {
                newperson.id = nextId++;
                $scope.persons.push(newperson);
            } else {
                for (var i = 0; i < $scope.persons.length; i++) {
                    if ($scope.persons[i].id === newperson.id) {
                        $scope.persons[i] = newperson;
                        break;
                    }
                }
            }
        };
        return {
            addPerson: addPerson
        };
    }]);

app.controller("GetController", ["$scope", "$routeParams",'PersonFactory', function (PersonFactory, $scope, $routeParams) {
        
        $scope.persons = PersonFactory.getAll;
        
        var i = Number($routeParams.id); 
        $scope.person = $scope.persons[i-1];
    }]);

app.controller("GetAllController", ["$scope", 'PersonFactory', function (PersonFactory, $scope){
        
         $scope.persons = PersonFactory.getAll;
         console.log("Blaaaaaaaaaaaaaaaah");
}]);




