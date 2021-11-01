import React, { useState, useEffect } from "react";



export var newQuestions;
export const useFetch = () => {
	const [number, setNumber] = useState(10);
	const [category, setCategory] = useState(9);
	const [difficulty, setDifficulty] = useState("easy");
	let [questions, setQuestions] = useState([]);
	const [Loading, setLoading] = useState(false);
	const [ready, setReady] = useState(false);

	// get questions
	const getQuestions = async () => {
		setLoading(true);
		let data;
		try {
			const res = await fetch(
				`https://opentdb.com/api.php?amount=${number}&category=${category}&difficulty=${difficulty}`
			);
			if (res.ok) {
				data = await res.json();
			}
			const questions = data.results;
			if (questions) {
				newQuestions = questions;
				setQuestions(questions);
				setReady(true);
				setLoading(false);
			}
			throw new Error("Request failed");
		} catch (error) {
			console.log(error);
		}
	};

	return {
		setNumber,
		setDifficulty,
		setCategory,
		number,
		category,
		difficulty,
		questions,
		Loading,
		ready,
		getQuestions,
	};
};

