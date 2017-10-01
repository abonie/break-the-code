import React, { Component } from 'react';
import './summary-questionnaire.scss';
import set from 'lodash/set';

class SummaryQuestionnaire extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  handleChange(field, event) {
    let value = event.target.value;
    if(event.target.type=="checkbox"){
      value = event.target.checked;
    }
    set(this.state, field, value);
    this.setState(this.state);
  };

  createScale(field) {
    return(
      <div onChange={this.handleChange.bind(this, field)}>
        <input type="radio" value="-3" name={field}/> -3
        <input type="radio" value="-2" name={field}/> -2
        <input type="radio" value="-1" name={field}/> -1
        <input type="radio" value="0" name={field}/> 0
        <input type="radio" value="1" name={field}/> 1
        <input type="radio" value="2" name={field}/> 2
        <input type="radio" value="3" name={field}/> 3
      </div>
    );
  }

  mapQuestion(){
    let questionsData = [
      {question: 'The experiment was too long', field: 'tooLong'},
      {question: 'I continued from each question to the next because it was engaging', field: 'wasEngaging'},
      {question: 'The experiment created a feeling of challenge', field: 'feelingOfChallenge'},
      {question: 'I wondered how others did', field: 'howOthersDid'},
      {question: 'It was important for me to get a high score', field: 'importantToGetHighScore'},
      {question: 'I did not care if I succeeded', field: 'careIfSucceeded'},
      {question: 'It was important for me to answer quickly', field: 'answerQuickly'},
      {question: 'It was important for me to answer correctly', field: 'answerCorrectly'},
      {question: 'I checked the answer before submitting', field: 'checkedBeforeSubmitting'},
      {question: 'It was not clear at the beginning what to do', field: 'notClearWhatToDo'},
      {question: 'It was easy to understand what to do without reading the instructions', field: 'withoutReadingTheInstructions'},
      {question: 'Other people would enjoy participating in the experiment', field: 'otherWillEnjoy'}
    ];
    let questions = questionsData.map((questionData) =>
      this.createQuestion(questionData)
    );
    return(
      <div>{questions}</div>
    );
  }

  createQuestion(questionData) {
    return (
      <div className="question"  key={questionData.field}>
        <label>
          {questionData.question}
          {this.createScale(questionData.field)}
        </label>
      </div>
    );
  }

  render() {
    return(
      <div className='summaryQuestionnaire'>
        <div className='lastEffort'>Last effort...</div>
        <div className='instruction'>How much do you agree with the following statements:</div>
        {/*<div>-3: strongly disagree</div>*/}
        {/*<div> 0: neither agree nor disagree</div>*/}
        {/*<div> 3: strongly disagree</div>*/}
        <div className='index'>-3: strongly disagree; 0: neither agree nor disagree; 3: strongly disagree</div>
        {this.mapQuestion()}
      </div>
    );
  }
}

export default SummaryQuestionnaire;
