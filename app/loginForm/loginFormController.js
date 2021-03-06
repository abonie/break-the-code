define([
    '../app',
    'angular',
    '../service/questionService',
    '../service/userService',
    '../utils/utils'
], function(app) {
    app.controller('loginFormController', ['$scope', '$location', 'UserService', 'QuestionService',
    function($scope, $location, UserService, QuestionService) {
        var self = this;
        $scope.user = {};
        var groupNum = $location.search().groupNum;
        if(typeof(groupNum)!='undefined' && groupNum != ""){
            $scope.user.groupNum = groupNum;
        }
        var createUser = UserService.createUser($scope.user).then(function(user){
            $scope.user.id = user.id;
        });
        $scope.programmingLanguagesOptions = [
        'C', 'C ++', 'C#', 'java', 'JavaScript', 'python',
        'perl', 'PHP', 'Fortran', '.NET', 'SQL', 'Ruby',
        'Matlab', 'Scala', 'Haskell'
        ];

        $scope.startTheGame = function (){
            createUser.then(function(user){
                 UserService.updateUser($scope.user);
                 $location.path('explain');
                 QuestionService.restartQuestionIndex();
            });
        };

        $scope.openUserInformationForm = function(){
            $scope.$emit('openPopup');
        }
        
    }]);
});
