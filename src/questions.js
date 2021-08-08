import React, { useState, useEffect } from "react";
import { BsTrophy } from "react-icons/bs";
import { newQuestions } from "./useFetch";

function Questions() {
	const [keys, setKey] = useState(null);
	const [count, setCount] = useState(0);
	const [rigthAnswer, setRigthAnswer] = useState(0);
	const nextQuestion = newQuestions[count];

	if (nextQuestion) {
		console.log(nextQuestion);
		var answers = [
			nextQuestion.correct_answer,
			...nextQuestion.incorrect_answers,
		];
		var newAnswers = answers
			.map((value) => ({ value, sort: Math.random() }))
			.sort((a, b) => a.sort - b.sort)
			.map(({ value }) => value);
		console.log(newAnswers);
	}

	// get answer
	const getAnswer = (e) => {
		let answer = e.target.textContent;
		if (answer === answers[0]) {
			setRigthAnswer(rigthAnswer + 1);
		} else if (!answer) {
			setRigthAnswer(rigthAnswer);
		}
		getNextQuestion();
	};

	// go to next question
	const getNextQuestion = () => {
		const num = Math.random();
		setKey(num);
		setCount(count + 1);
	};

	//
	if (count === newQuestions.length) {
		return (
			<>
				<div className="reload_container">
					<div className="reload_text_container">
						{rigthAnswer === Math.floor(newQuestions.length) ? (
							<h1>
								Excellent! <BsTrophy className="trophy-icon" />
							</h1>
						) : rigthAnswer > Math.floor(newQuestions.length / 2) ? (
							<h1>
								Good! <BsTrophy className="trophy-icon" />
							</h1>
						) : (
							<h1>Bad! Try again</h1>
						)}

						<p className="correct_answers">
							You answered {rigthAnswer} / {newQuestions.length} questions
							correctly
						</p>
						<div className="btn_container reload_btn_container">
							<button
								type="button"
								className="reload_btn"
								onClick={() => window.location.reload()}
							>
								Try again
							</button>
						</div>
					</div>
				</div>
			</>
		);
	}
	return (
		<>
			<div className="main-container main_question_container">
				{nextQuestion && (
					<>
						<div className="question_container" key={keys}>
							<h1>{nextQuestion.question}</h1>
							{newAnswers.map((answer) => {
								return (
									<p key={Math.random()} onClick={getAnswer}>
										{answer}
									</p>
								);
							})}
						</div>
						<div className="btn_container">
							<button
								type="button"
								className="next_btn"
								onClick={getNextQuestion}
							>
								next Question
							</button>
						</div>
					</>
				)}
			</div>
		</>
	);
}

export default Questions;
