import React, { Component } from 'react'
import { QuizData } from './QuizData'
import './styles.css'

class Quiz extends Component {

constructor(props) {
    super(props)

    this.state = {
    userAnswer:null,    //current users answer
    currentIndex:0,  //current questions index
    options: [],       //the four options
    quizEnd: false, //True if it's the last question
    score: 0,      //the Score
    disabled: true,
    }
}

//Component that holds the current quiz
loadQuiz = () => {
    const {currentIndex} = this.state //get the current index
    this.setState(() => {
        return {
            question: QuizData[currentIndex].question,
            options : QuizData[currentIndex].options,
            answer: QuizData[currentIndex].answer          
        }
    }
    )
}

//Handles Click event for the next button
nextQuestionHander = () => {
    const {userAnswer, answer, score} = this.state
    
    //Check for correct answer and increment score
    if(userAnswer === answer){
        this.setState({
            score: score + 1
        })
    }

    this.setState({
        currentIndex: this.state.currentIndex + 1,
        userAnswer: null
    })
}

//Responds to the click of the finish button
finishHandler =() => {
    const {userAnswer, answer, score} = this.state

    if(userAnswer === answer) {
        this.setState({
            score: score + 1
        })
    }

    if(this.state.currentIndex === QuizData.length -1){
        this.setState({
            quizEnd:true
        })
    }

}

//Load the quiz once the component mounts
componentDidMount(){
    this.loadQuiz();
}

//Check the answer
checkAnswer = answer => {
    this.setState({
        userAnswer: answer,
        disabled:false
    })
}

//Update the component
componentDidUpdate(prevProps, prevState){
    const{currentIndex} = this.state;
    if(this.state.currentIndex !== prevState.currentIndex){
        this.setState(() => {
            return {
                disabled: true,
                question: QuizData[currentIndex].question,
                options : QuizData[currentIndex].options,
                answer: QuizData[currentIndex].answer          
            }
        });

    }
}

render() {
    const {question, options, userAnswer, currentIndex, quizEnd} = this.state;

    return (
      <div>
        <h2>{question}</h2>
        <span>{`Question ${currentIndex + 1} of ${QuizData.length} - Score: ${this.state.score}`}</span>
        {
            options.map(option => 
                <p key={option.id} className={`options ${userAnswer === option ? "selected" : null}`} 
                onClick = {() => this.checkAnswer(option)}>
                    {option}
                </p>
            )
        }

        {currentIndex < QuizData.length - 1 && 
            <button disabled={this.state.disabled} onClick={this.nextQuestionHander}>Next question</button>}

        {currentIndex === QuizData.length - 1 &&
        <button disabled={this.state.disabled} onClick={this.finishHandler}>Finish</button>}
      </div>
    )
  }
}

export default Quiz
