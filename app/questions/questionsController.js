//http://localhost:3000/index.html#/login
angular.module('BreakTheCode')
    .controller('QuestionsController', ['$scope', '$location', '$http', '$sce', 'QuestionService', 'AnswerService',
        function($scope, $location, $http, $sce, QuestionService, AnswerService) {

            $scope.finishQuestion = finishQuestion;
            $scope.gameOver = false;
            $scope.startNewQuestion = startNewQuestion;
            startNewQuestion();

            $scope.$on('nextQuestion', function (event, args) {
                startNewQuestion();
            });

            function startNewQuestion(){
                if (!QuestionService.isThereMoreQuestions()) {
                    gameOver();
                    return;
                }
                cleanAnswerArea();
                QuestionService.getQuestion().then(function(question, status, headers, config) {
                    setQuestion(question);
                    setTimer($scope.timeForQuestion);
                    startTimer();
                });
                // .error(function(data, status, headers, config) {
                //        console.log("we have a problem..");
                //        //TODO : error handling
                //});
            }

            function cleanAnswerArea(){
                $scope.$emit("cleanAnswerArea");
            }

            function setQuestion(question){
                this.currentQuestion = question;
                $scope.correctAnswer = question.answer;
                $scope.content = question.content;
                $scope.timeForQuestion = getTimeForQuestion(question);
            }

            function getTimeForQuestion(question){
                var timeForQuestion = question.timeForQuestion;
                if(!timeForQuestion){
                    timeForQuestion = 13;
                }
                return timeForQuestion;
            }

            function summarizeQuestion(){
                var answer =  $scope.answer;
                if(this.currentQuestion) {
                    $scope.correctAnswer = this.currentQuestion.answer;
                    $scope.$broadcast('checkAnswer');
                }
            }

            function finishQuestion() {
                stopTimer();
                summarizeQuestion();
            }

            function gameOver(){
                //TODO
                $scope.gameOver = true;
                console.log("gameOver");
            }

            function startTimer(){
                $scope.$broadcast('timer-start');
            }

            function stopTimer(){
                $scope.$broadcast('timer-stop');
            }

            function setTimer(time){
                $scope.$broadcast('timer-set-countdown', time);
            }

            $scope.$on('timer-stopped', function (event, args) {
                summarizeQuestion();
            });

        }]);