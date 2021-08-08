import React, { useState, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { useFetch } from "./useFetch";
import Questions from "./questions";

function Quiz() {
	const {
		setNumber,
		setDifficulty,
		setCategory,
		number,
		category,
		difficulty,
		Loading,
		ready,
		getQuestions,
	} = useFetch();

	// onSubmit

	const handleSubmit = (e) => {
		e.preventDefault();
		getQuestions();
	};
	
	if (Loading) {
		return (
			<>
				<div className="main-container spin-container">
					<h1>
						{" "}
						<FaSpinner className="spinner" />
					</h1>
				</div>
			</>
		);
	}

	if (ready) {
		return (
			<>
				<Questions />
			</>
		);
	}

	return (
		<>
			<div className="main-container">
				<h1>SetUp Quiz</h1>
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor="number">Number of Questions</label>
						<input
							type="number"
							name="number"
							id="number"
							min="1"
							defaultValue={number}
							onChange={(e) => setNumber(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="category">Category</label>
						<select
							name="category"
							id="category"
							value={category}
							onChange={(e) => setCategory(e.target.value)}
						>
							<option value={21}>Sports</option>
							<option value={23}>History</option>
							<option value={24}>Politics</option>
							<option value={9}>General knowledge</option>
							<option value={17}>Science &#38; Nature</option>
							<option value={20}>Mythology</option>
							<option value={27}>Animals</option>
						</select>
					</div>
					<div>
						<label htmlFor="difficulty">Select Dificulty</label>
						<select
							name="difficulty"
							id="difficulty"
							value={difficulty}
							onChange={(e) => setDifficulty(e.target.value)}
						>
							<option value="easy">easy</option>
							<option value="medium">medium</option>
							<option value="hard">hard</option>
						</select>
					</div>
				</form>
				<button type="button" className="start_btn" onClick={getQuestions}>
					Start
				</button>
			</div>
		</>
	);
}

export default Quiz;
