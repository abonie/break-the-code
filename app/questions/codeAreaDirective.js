define([
    'jquery',
    'codemirror',
    'angular',
    '../app',
    'text!./codeAreaTemplate.html'
], function($, CodeMirror) {
angular.module('BreakTheCode')
    .directive('codeArea', function() {
        return {
            restrict: 'E',
            templateUrl: 'questions/codeAreaTemplate.html',
            link: function (scope, element) {
                var textArea = $(element).find('textarea').get(0);
                var editor = CodeMirror.fromTextArea(textArea, {
                    theme: 'default',
                    lineNumbers: true
                });
                scope.$watch('content', function() {
                    var content = scope.content;
                    if(content){
                        editor.setValue(content);
                    }
                });

            }
        };
    });
    });