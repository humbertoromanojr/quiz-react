import React, { Component } from 'react'
import QuizData from './QuizData'
import './style.css'

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
    const {question, options, answer, currentIndex, quizEnd} = this.state;

    return (
      <>
        
      </>
    )
  }
}

export default Quiz
