import React, { useState } from 'react';
import './App.css';
import Alert from '@mui/material/Alert';
import Dropdown from 'react-bootstrap/Dropdown';

export default function App() {
  const easyQuestions = [
    {
      questionText: 'In which sport would you perform a slam dunk?',
      options: ['Tennis', 'Soccer', 'Basketball', 'Golf'],
      correctAnswer: 'Basketball',
      result: '',
    },
    {
      questionText: 'Which movie franchise features characters such as Luke Skywalker, Darth Vader, and Princess Leia?',
      options: ['Star Trek', 'Star Wars', 'Battlestar Galactica', 'Guardians of the Galaxy'],
      correctAnswer: 'Star Wars',
      result: '',
    },
    {
      questionText: 'Who is known as "The Greatest" in the world of boxing?',
      options: ['Mike Tyson', 'Sugar Ray Leonard', 'Muhammad Ali', 'Floyd Mayweather'],
      correctAnswer: 'Muhammad Ali',
      result: '',
    },
    {
      questionText: 'Which sport is often referred to as "The Beautiful Game"?',
      options: ['Tennis', 'Football', 'Rugby', 'Golf'],
      correctAnswer: 'Football',
      result: '',
    },
    {
      questionText: 'Who directed the 1994 film Pulp Fiction?',
      options: ['Quentin Tarantino', 'Martin Scorsese', 'Christopher Nolan', 'David Fincher'],
      correctAnswer: 'Quentin Tarantino',
      result: '',
    },
  ];

  const normalQuestions = [
    {
      questionText: 'Who directed the 1994 film "Forrest Gump"?',
      options: ['Quentin Tarantino', 'Martin Scorsese', 'Robert Zemeckis', 'Christopher Nolan'],
      correctAnswer: 'Robert Zemeckis',
      result: '',
    },
    {
      questionText: 'Which movie won the Academy Award for Best Picture in 2020?',
      options: ['Parasite', 'Joker', '1917', 'Once Upon a Time in Hollywood'],
      correctAnswer: 'Parasite',
      result: '',
    },
    {
      questionText: 'In which sport does Usain Bolt hold the world record for the 100 meters?',
      options: ['Soccer', 'Swimming', 'Basketball', 'Athletics'],
      correctAnswer: 'Athletics',
      result: '',
    },
    {
      questionText: 'Which actor played the character Tony Stark/Iron Man in the Marvel Cinematic Universe?',
      options: ['Chris Hemsworth', 'Chris Evans', 'Robert Downey Jr.', 'Mark Ruffalo'],
      correctAnswer: 'Robert Downey Jr.',
      result: '',
    },
    {
      questionText: 'In the movie "The Shawshank Redemption," who plays the role of Andy Dufresne?',
      options: ['Morgan Freeman', 'Tim Robbins', 'Tom Hanks', 'Brad Pitt'],
      correctAnswer: 'Tim Robbins',
      result: '',
    },
  ];

  const hardQuestions = [
    {
      questionText: 'Which country has won the most FIFA World Cup titles?',
      options: ['Brazil', 'Germany', 'Argentina', 'Italy'],
      correctAnswer: 'Brazil',
      result: '',
    },
    {
      questionText: 'In the movie "The Godfather," who plays the role of Michael Corleone?',
      options: ['Al Pacino', 'Marlon Brando', 'Robert De Niro', 'Joe Pesci'],
      correctAnswer: 'Al Pacino',
      result: '',
    },
    {
      questionText: 'Which female tennis player holds the record for the most Grand Slam singles titles?',
      options: ['Serena Williams', 'Steffi Graf', 'Martina Navratilova', 'Margaret Court'],
      correctAnswer: 'Margaret Court',
      result: '',
    },
    {
      questionText: 'Who wrote the screenplay for the 1999 film "Being John Malkovich"?',
      options: ['Joel Coen', 'Charlie Kaufman', 'Quentin Tarantino', 'Sofia Coppola'],
      correctAnswer: 'Charlie Kaufman',
      result: '',
    },
    {
      questionText: 'Which sportscaster is known for his catchphrase "Do you believe in miracles?" during the 1980 Winter Olympics?',
      options: ['Jim Nantz', 'Al Michaels', 'Bob Costas', 'Joe Buck'],
      correctAnswer: 'Al Michaels',
      result: '',
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState(null);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showResetButton, setShowResetButton] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy');
  const [currentQuestions, setCurrentQuestions] = useState(easyQuestions);

  const getScoreMessage = (userScore, difficulty, totalQuestions) => {
    if (userScore === totalQuestions) {
      return `${userScore}/${totalQuestions} Impressive! You aced the ${difficulty} level!`;
    } else if (userScore >= 1) {
      return `You scored ${userScore}/${totalQuestions} on the ${difficulty} level. Good job!`;
    } else {
      return `You scored ${userScore}/${totalQuestions} on the ${difficulty} level. Keep practicing!`;
    }
  };

  const handleAnswerClick = (selectedAnswer) => {
    const updatedQuestion = { ...currentQuestions[currentQuestion] };

    updatedQuestion.options.forEach((option) => {
      updatedQuestion.result = 'wrong';
    });

    // Mark the selected option as 'correct' or 'wrong'
    updatedQuestion.result = selectedAnswer === updatedQuestion.correctAnswer ? 'correct' : 'wrong';

    if (selectedAnswer === updatedQuestion.correctAnswer) {
      setScore(score + 1);
    }

    currentQuestions[currentQuestion] = updatedQuestion;

    const buttons = document.querySelectorAll('.answer-section button');
    buttons.forEach((button) => {
      if (button.textContent === selectedAnswer) {
        button.classList.add('clicked');
      }
    });

    setShowNextButton(true);
  };

  const handleNextQuestion = () => {
    setShowNextButton(false);

    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setMessage(getScoreMessage(score, selectedDifficulty, currentQuestions.length));
      setShowResetButton(true);
    }
  };

  const handleDifficultyChange = (difficulty) => {
    setSelectedDifficulty(difficulty);

    setCurrentQuestion(0);
    if (difficulty === 'easy') {
      setCurrentQuestions(easyQuestions);
    } else if (difficulty === 'normal') {
      setCurrentQuestions(normalQuestions);
    } else if (difficulty === 'hard') {
      setCurrentQuestions(hardQuestions);
    }

    setScore(0);
    setMessage(null);
    setShowResetButton(false);
  };

  const handleResetDifficulty = () => {
    handleDifficultyChange(selectedDifficulty);
  };

  return (
    <div className="app ">
      <div>
        <Dropdown>
          <Dropdown.Toggle variant="dark" id="dropdown-basic">
            {selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1)}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleDifficultyChange('easy')}>Easy</Dropdown.Item>
            <Dropdown.Item onClick={() => handleDifficultyChange('normal')}>Normal</Dropdown.Item>
            <Dropdown.Item onClick={() => handleDifficultyChange('hard')}>Hard</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <div className="question-section">
          <div className="question-count mb-3">
            <span className="fs-5">{`Question ${currentQuestion + 1}/${currentQuestions.length}`}</span>
          </div>
          <div className="question-text w-100">
            <p className="fs-4">{currentQuestions[currentQuestion].questionText}</p>
          </div>
        </div>
      </div>
      <div className="answer-section">
        {currentQuestions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            className={`mb-3 w-100 ${
              currentQuestions[currentQuestion].result === 'correct' && option === currentQuestions[currentQuestion].correctAnswer
                ? 'correct'
                : currentQuestions[currentQuestion].result === 'wrong' && option !== currentQuestions[currentQuestion].correctAnswer
                ? 'wrong'
                : ''
            }`}
            onClick={() => handleAnswerClick(option)}
          >
            {option}
          </button>
        ))}
        {showNextButton && (
          <button
            style={{ fontSize: '14px', width: '100px', margin: '10px auto', display: 'flex', textAlign: 'center', justifyContent: 'center' }}
            className="nextbtn mt-2"
            onClick={handleNextQuestion}
          >
            Next
          </button>
        )}
        {showResetButton && (
          <button
            style={{ fontSize: '14px', width: '100px', margin: '10px auto', display: 'flex', textAlign: 'center', justifyContent: 'center' }}
            onClick={handleResetDifficulty}
          >
            Reset
          </button>
        )}
      </div>

      {message && (
        <div>
          <Alert variant="outlined" severity={score === currentQuestions.length ? 'success' : 'info'}>
            {message}
          </Alert>
        </div>
      )}
    </div>
  );
}
