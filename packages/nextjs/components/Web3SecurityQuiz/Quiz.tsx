import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import ProgressBar from "./ProgressBar";
import { QuizQuestion, quizQuestions } from "./questions";
import { useAccount } from "wagmi";

const QUESTIONS_PER_BATCH = 10;

function getProgressKey(address: string) {
  return `web3-quiz-progress-${address}`;
}

// Optimized progress data structure - only store essential data
interface QuizProgress {
  answeredIds: number[];
  currentBatch: number;
  currentQuestionIdx: number;
  selectedQuestionIds: number[]; // Store only IDs instead of full objects
  userAnswers: string[];
  batchComplete: boolean;
  lastSaved: number; // Timestamp for cache invalidation
}

const initialProgress: QuizProgress = {
  answeredIds: [],
  currentBatch: 0,
  currentQuestionIdx: 0,
  selectedQuestionIds: [],
  userAnswers: [],
  batchComplete: false,
  lastSaved: Date.now(),
};

const Quiz: React.FC = () => {
  const { address: userAddress, isConnected } = useAccount();
  const [selectedQuestions, setSelectedQuestions] = useState<QuizQuestion[]>([]);
  const [showReference, setShowReference] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showReselect, setShowReselect] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Use optimized localStorage hook without performance tracking
  const [progress, setProgress, removeProgress] = useLocalStorage<QuizProgress>(
    userAddress ? getProgressKey(userAddress) : "",
    initialProgress,
    {
      debounceMs: 200, // Faster debounce for better responsiveness
    },
  );

  // Destructure progress for easier access
  const { answeredIds, currentBatch, currentQuestionIdx, selectedQuestionIds, userAnswers, batchComplete } = progress;

  // Load questions from stored IDs on mount
  useEffect(() => {
    if (userAddress && selectedQuestionIds.length > 0) {
      const questions = selectedQuestionIds
        .map(id => quizQuestions.find(q => q.id === id))
        .filter(Boolean) as QuizQuestion[];
      setSelectedQuestions(questions);
    }
    setIsLoading(false);
  }, [userAddress, selectedQuestionIds]);

  // Optimized question selection - only when needed
  useEffect(() => {
    if (selectedQuestions.length === 0 && !isLoading && userAddress) {
      const unanswered = quizQuestions.filter(q => !answeredIds.includes(q.id));
      if (unanswered.length > 0) {
        const shuffled = [...unanswered].sort(() => 0.5 - Math.random());
        const newQuestions = shuffled.slice(0, QUESTIONS_PER_BATCH);
        setSelectedQuestions(newQuestions);

        // Update progress with new question IDs
        setProgress(prev => ({
          ...prev,
          selectedQuestionIds: newQuestions.map(q => q.id),
        }));
      }
    }
  }, [currentBatch, answeredIds, selectedQuestions.length, isLoading, userAddress, setProgress]);

  // Reset answer state on question change
  useEffect(() => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    setShowReference(false);
    setShowReselect(false);
  }, [currentQuestionIdx]);

  // Memoized current question to avoid recalculations
  const currentQ = useMemo(() => selectedQuestions[currentQuestionIdx], [selectedQuestions, currentQuestionIdx]);

  // Memoized global question number
  const globalQuestionNumber = useMemo(
    () => answeredIds.length + currentQuestionIdx + 1,
    [answeredIds.length, currentQuestionIdx],
  );

  // Memoized quiz completion status
  const isQuizComplete = useMemo(() => answeredIds.length === quizQuestions.length, [answeredIds.length]);

  // Optimized answer handler with useCallback
  const handleAnswer = useCallback(
    (answer: string) => {
      if (!currentQ) return;

      setSelectedAnswer(answer);
      setIsAnswered(true);

      if (answer === currentQ.correctAnswer) {
        setTimeout(() => {
          const newUserAnswers = [...userAnswers, answer];

          if (currentQuestionIdx < selectedQuestions.length - 1) {
            // Move to next question
            setProgress(prev => ({
              ...prev,
              currentQuestionIdx: prev.currentQuestionIdx + 1,
              userAnswers: newUserAnswers,
            }));
          } else {
            // End of batch
            setProgress(prev => ({
              ...prev,
              answeredIds: [...prev.answeredIds, ...selectedQuestions.map(q => q.id)],
              batchComplete: true,
              userAnswers: newUserAnswers,
            }));
          }

          setShowReference(false);
          setIsAnswered(false);
          setSelectedAnswer(null);
          setShowReselect(false);
        }, 700);
      } else {
        setShowReference(true);
        setShowReselect(true);
      }
    },
    [currentQ, userAnswers, currentQuestionIdx, selectedQuestions, setProgress],
  );

  // Optimized reselect handler
  const handleReselect = useCallback(() => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    setShowReference(false);
    setShowReselect(false);
  }, []);

  // Optimized next batch handler
  const handleNextBatch = useCallback(() => {
    setProgress(prev => ({
      ...prev,
      currentBatch: prev.currentBatch + 1,
      currentQuestionIdx: 0,
      selectedQuestionIds: [],
      userAnswers: [],
      batchComplete: false,
    }));
    setSelectedQuestions([]);
  }, [setProgress]);

  // Optimized reset handler
  const handleReset = useCallback(() => {
    removeProgress();
    setSelectedQuestions([]);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setShowReference(false);
    setShowReselect(false);
  }, [removeProgress]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // Not connected state
  if (!isConnected || !userAddress) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <div className="text-center text-lg font-semibold mb-4">Please connect your wallet to start the quiz.</div>
        <div className="text-center text-base-content/70">Connect your wallet to access the Web3 Security Quiz</div>
      </div>
    );
  }

  // No questions available
  if (!selectedQuestions.length) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <div className="text-center text-lg font-semibold mb-4">No questions available</div>
        <div className="text-center text-base-content/70">All questions have been completed!</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="max-w-2xl w-full p-6 bg-base-100 rounded-2xl shadow-2xl border border-base-300">
        <h2 className="text-3xl font-extrabold mb-2 text-center text-primary">Web3 Security Quiz</h2>
        <div className="text-center mb-2 text-base-content/70 font-medium">
          Question {globalQuestionNumber}/{quizQuestions.length}
        </div>
        <ProgressBar current={globalQuestionNumber} total={quizQuestions.length} />

        {!batchComplete && !isQuizComplete && currentQ && (
          <>
            <div className="quiz-question text-lg font-semibold mb-6 text-center text-base-content/90">
              {currentQ.question}
            </div>
            <div className="quiz-choices flex flex-col gap-3 mb-4">
              {currentQ.choices.map(choice => {
                const isSelected = selectedAnswer === choice[0];
                const isCorrect = currentQ.correctAnswer === choice[0];
                let btnClass = "btn btn-outline normal-case text-base transition-all duration-200";

                if (isAnswered && isSelected && isCorrect) {
                  btnClass += " btn-success border-success bg-success/20 text-success-content font-bold";
                } else if (isAnswered && isSelected && !isCorrect) {
                  btnClass += " btn-error border-error bg-error/20 text-error-content font-bold animate-shake";
                } else if (isAnswered && !isSelected) {
                  btnClass += " opacity-60";
                }

                return (
                  <button
                    key={choice}
                    onClick={() => !isAnswered && handleAnswer(choice[0])}
                    disabled={isAnswered && (!isSelected || isCorrect)}
                    className={btnClass}
                    style={{ minHeight: 48 }}
                  >
                    {choice}
                  </button>
                );
              })}
            </div>

            {showReference && (
              <div className="alert alert-warning mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
                <div>
                  <span className="font-semibold">Incorrect!</span> Please review the reference:
                  <a
                    href={currentQ.reference}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link link-primary ml-1"
                  >
                    {currentQ.reference}
                  </a>
                </div>
              </div>
            )}

            {showReselect && (
              <button onClick={handleReselect} className="btn btn-accent w-full mb-2">
                Try Again
              </button>
            )}
          </>
        )}

        {batchComplete && !isQuizComplete && (
          <div className="flex flex-col items-center">
            <div className="alert alert-success mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Batch completed! Ready for the next set of questions.</span>
            </div>
            <button onClick={handleNextBatch} className="btn btn-primary btn-lg">
              Show next {QUESTIONS_PER_BATCH} questions
            </button>
          </div>
        )}

        {isQuizComplete && (
          <div className="flex flex-col items-center">
            <div className="alert alert-success mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-xl font-bold">🎉 Congratulations! 🎉</span>
            </div>
            <div className="text-center text-lg text-base-content/70">
              You have successfully answered all the questions!
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2 mt-4">
        <button className="btn btn-outline btn-error" onClick={handleReset}>
          Reset Quiz Progress
        </button>
      </div>
    </div>
  );
};

export default Quiz;
