var userDao = require('../dao/userDao');
var testPlanService = require('./../services/testPlanService');
var questionService = require('./../services/questionService');

module.exports = function (app) {
    app.post('/user', function (req, res) {
        testPlanService.getTestPlan().then(function(testPlan){
            var user = {};
            user.id = new Date().getTime();
            user.testPlan = testPlan;
            if(req && req.body){
                user.age = req.body.age;
                user.gender = req.body.gender;

                user.yearsOfExperience = req.body.yearsOfExperience;
                user.programmingLanguages = req.body.programmingLanguages;
                if(req.body.assessProgrammingSkills == '0 (novice)'){
                    user.assessSelfProgrammingSkills = 0;
                }
                else if(req.body.assessProgrammingSkills == '5 (expert)'){
                        user.assessSelfProgrammingSkills = 5;
                }else{
                    user.assessSelfProgrammingSkills = req.body.assessProgrammingSkills;
                }
                user.firstTime = !req.body.notFirstTime;

                if(req.body.degree){
                    user.selfTaught = req.body.degree.selfTaught||false;
                    if(req.body.degree.BA){
                        user.baFinised = req.body.degree.BA.finised||false;
                        user.baStarted = req.body.degree.BA.started;
                        if(req.body.degree.BA.studied == '5+'){
                            user.baStudied = 6;
                        }else {
                            user.baStudied = req.body.degree.BA.studied;
                        }
                    }
                    if(req.body.degree.MA){
                        user.maFinised = req.body.degree.MA.finised||false;
                        user.maStarted = req.body.degree.MA.started;
                        if(req.body.degree.MA.studied == '5+'){
                            user.maStudied = 6;
                        }else {
                            user.maStudied = req.body.degree.MA.studied;
                        }
                    }
                    if(req.body.degree.PhD) {
                        user.phdFinised = req.body.degree.PhD.finised||false;
                        user.phdStarted = req.body.degree.PhD.started;
                        if(req.body.degree.PhD.studied == '5+'){
                            user.phdStudied = 6;
                        }else {
                            user.phdStudied = req.body.degree.PhD.studied;
                        }
                    }
                }
            }
            
            userDao.save(user).then(function(){
                questionService.getQuestions(user.testPlan).then(function(questions){
                    user.questions = questions;
                    res.status(201).json(user);
                });
            });

        });
    });
};