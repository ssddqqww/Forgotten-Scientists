"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import type { FieldQuiz } from "../../../../data/quizzes";

type QuizRunnerProps = {
  quiz: FieldQuiz;
};

type QuizState = "question" | "feedback" | "results";

const questionTypeLabels: Record<string, string> = {
  recognition: "Recognition",
  achievement: "Achievement",
  fieldUnderstanding: "Concept",
  trueFalse: "True / False",
  impact: "Impact",
  oddOneOut: "Odd One Out",
  scenario: "Scenario",
  timeline: "Timeline",
  clue: "Clue",
  compare: "Compare",
  workOn: "Applied Scenario",
  wrongMatch: "Wrong Match",
};

export default function QuizRunner({ quiz }: QuizRunnerProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [state, setState] = React.useState<QuizState>("question");
  const [pickedOptionId, setPickedOptionId] = React.useState("");
  const [answers, setAnswers] = React.useState<Record<number, string>>({});

  const question = quiz.questions[currentQuestionIndex];
  const questionNumber = currentQuestionIndex + 1;
  const isLastQuestion = questionNumber === quiz.questions.length;

  const correctCount = quiz.questions.filter(
    (item) => answers[item.id] === item.correctOptionId
  ).length;
  const pickedAnswerIsCorrect = pickedOptionId === question.correctOptionId;
  const correctPercent = Math.round((correctCount / quiz.questions.length) * 100);
  const incorrectPercent = 100 - correctPercent;

  const handleAnswer = (optionId: string) => {
    if (state === "feedback") return;

    setPickedOptionId(optionId);
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [question.id]: optionId,
    }));
    setState("feedback");
  };

  const goToNextQuestion = () => {
    setPickedOptionId("");
    setCurrentQuestionIndex((index) => index + 1);
    setState("question");
  };

  const getAnswerClassName = (optionId: string) => {
    const baseClassName =
      "min-h-36 rounded-lg border px-5 py-6 text-center text-lg font-bold leading-7 transition";

    if (state !== "feedback") {
      return `${baseClassName} border-gray-200 bg-[#f2f2f2] text-gray-900 hover:border-black hover:bg-white`;
    }

    if (optionId === question.correctOptionId) {
      return `${baseClassName} border-[#2f6f4e] bg-[#e9f6ef] text-[#123d28] shadow-[0_10px_28px_rgba(47,111,78,0.16)]`;
    }

    if (optionId === pickedOptionId) {
      return `${baseClassName} border-[#9c3f3f] bg-[#f8e8e8] text-[#5f1f1f] shadow-[0_10px_28px_rgba(156,63,63,0.13)]`;
    }

    return `${baseClassName} border-gray-200 bg-[#f7f7f7] text-gray-400`;
  };

  return (
    <main className="px-6 pb-20 pt-14 md:px-10 lg:px-20">
      <div className="mx-auto max-w-6xl">
        {state !== "results" && (
          <Link
            href="/#quizzes"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-black"
          >
            <span className="text-xl">←</span>
            Back to quizzes
          </Link>
        )}

        {(state === "question" || state === "feedback") && (
          <section className="min-h-[34rem]">
            <div className="mb-8">
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
                {quiz.field}
              </p>
              <h1 className="text-4xl font-bold md:text-5xl">{quiz.title}</h1>
              <p className="mt-4 max-w-3xl leading-7 text-gray-600">
                Question {questionNumber} of {quiz.questions.length}
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm md:p-8">
              <div className="mb-5 inline-flex rounded-full border border-gray-200 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">
                {questionTypeLabels[question.type] ?? "Question"}
              </div>
              <div className="grid items-center gap-8 md:grid-cols-[minmax(240px,0.9fr)_1fr]">
                {question.image ? (
                  <Image
                    src={question.image}
                    alt={quiz.title}
                    width={720}
                    height={460}
                    className="h-72 w-full rounded-md object-cover"
                  />
                ) : (
                  <div className="flex h-72 w-full items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 text-gray-500">
                    Quiz image placeholder
                  </div>
                )}
                <h2 className="text-3xl font-bold leading-tight md:text-4xl">
                  {question.prompt}
                </h2>
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {question.options.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleAnswer(option.id)}
                  disabled={state === "feedback"}
                  className={getAnswerClassName(option.id)}
                >
                  {option.text}
                </button>
              ))}
            </div>

            {state === "feedback" && (
              <div
                className={`mt-8 rounded-lg border p-6 ${
                  pickedAnswerIsCorrect
                    ? "border-[#2f6f4e] bg-[#f4fbf7]"
                    : "border-[#9c3f3f] bg-[#fff6f6]"
                }`}
              >
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div className="max-w-3xl">
                    <div
                      className={`mb-3 flex items-center gap-3 text-2xl font-bold ${
                        pickedAnswerIsCorrect ? "text-[#123d28]" : "text-[#5f1f1f]"
                      }`}
                    >
                      {pickedAnswerIsCorrect ? (
                        <CheckCircle2 className="h-7 w-7" />
                      ) : (
                        <XCircle className="h-7 w-7" />
                      )}
                      Your answer is {pickedAnswerIsCorrect ? "correct" : "incorrect"}
                    </div>
                    <p className="text-base font-semibold leading-7 text-gray-700">
                      {question.explanation}
                    </p>
                    {question.sourceUrl && (
                      <a
                        href={question.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex text-sm font-semibold text-gray-500 underline underline-offset-4 hover:text-black"
                      >
                        Source: {question.sourceLabel ?? "Reference"}
                      </a>
                    )}
                  </div>

                  <div className="flex min-w-52 flex-col gap-3">
                    {!isLastQuestion && (
                      <button
                        type="button"
                        onClick={goToNextQuestion}
                        className="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
                      >
                        Next question
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setState("results")}
                      className="inline-flex items-center justify-center gap-2 rounded-md border border-black px-4 py-2 text-sm font-semibold text-black hover:bg-black hover:text-white"
                    >
                      {isLastQuestion ? "See quick results" : "Finish now"}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        {state === "results" && (
          <section className="min-h-[34rem]">
            <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
                  {quiz.field}
                </p>
                <h1 className="text-5xl font-bold">Quick Results</h1>
              </div>
              <Link
                href="/#quizzes"
                className="inline-flex items-center gap-2 rounded-md bg-black px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
              >
                Return to quizzes
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-2xl font-bold">Last Quiz Results</h2>
                <div className="flex flex-col items-center gap-8">
                  <div
                    className="relative grid h-64 w-64 place-items-center rounded-full text-center shadow-[0_16px_38px_rgba(0,0,0,0.08)]"
                    style={{
                      background: `conic-gradient(#1f6b45 0 ${correctPercent}%, #d86b63 ${correctPercent}% 100%)`,
                    }}
                  >
                    <div className="grid h-40 w-40 place-items-center rounded-full bg-white">
                      <div>
                        <p className="text-4xl font-bold text-black">{correctPercent}%</p>
                        <p className="mt-1 text-sm font-semibold text-gray-500">
                          {correctCount} of {quiz.questions.length} correct
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid w-full gap-3 text-base font-bold">
                    <div className="flex items-center justify-between rounded-md bg-[#f4fbf7] px-4 py-3 text-[#123d28]">
                      <span className="flex items-center gap-3">
                        <span className="h-4 w-4 rounded-full bg-[#1f6b45]" />
                        Correct
                      </span>
                      <span>{correctPercent}%</span>
                    </div>
                    <div className="flex items-center justify-between rounded-md bg-[#fff4f3] px-4 py-3 text-[#5f1f1f]">
                      <span className="flex items-center gap-3">
                        <span className="h-4 w-4 rounded-full bg-[#d86b63]" />
                        Incorrect
                      </span>
                      <span>{incorrectPercent}%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Answer Review</h2>
                {quiz.questions.map((reviewQuestion, index) => {
                  const userAnswerId = answers[reviewQuestion.id];
                  const userAnswer = reviewQuestion.options.find(
                    (option) => option.id === userAnswerId
                  );
                  const rightAnswer = reviewQuestion.options.find(
                    (option) => option.id === reviewQuestion.correctOptionId
                  );
                  const answerIsCorrect = userAnswerId === reviewQuestion.correctOptionId;

                  return (
                    <article
                      key={reviewQuestion.id}
                      className={`rounded-lg border p-5 shadow-sm ${
                        answerIsCorrect
                          ? "border-[#d8eadf] bg-[#fbfffc]"
                          : "border-[#f0d6d3] bg-[#fffdfd]"
                      }`}
                    >
                      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                        <p className="text-sm font-bold uppercase tracking-[0.12em] text-gray-500">
                          Question {index + 1}
                        </p>
                        <span
                          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ${
                            answerIsCorrect
                              ? "bg-[#e9f6ef] text-[#123d28]"
                              : "bg-[#f8e8e8] text-[#5f1f1f]"
                          }`}
                        >
                          {answerIsCorrect ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : (
                            <XCircle className="h-4 w-4" />
                          )}
                          {answerIsCorrect ? "Correct" : "Incorrect"}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold leading-7 text-black">
                        {reviewQuestion.prompt}
                      </h3>

                      <div className="mt-4 grid gap-3 md:grid-cols-2">
                        <div className="rounded-md border border-gray-200 bg-white px-4 py-3">
                          <p className="mb-1 text-xs font-bold uppercase tracking-[0.12em] text-gray-500">
                            Your answer
                          </p>
                          <p className="font-semibold text-gray-900">
                            {userAnswer?.text ?? "No answer selected"}
                          </p>
                        </div>
                        <div className="rounded-md border border-[#d8eadf] bg-[#f4fbf7] px-4 py-3">
                          <p className="mb-1 text-xs font-bold uppercase tracking-[0.12em] text-[#38674f]">
                            Correct answer
                          </p>
                          <p className="font-semibold text-[#123d28]">
                            {rightAnswer?.text}
                          </p>
                        </div>
                      </div>

                      <p className="mt-4 leading-7 text-gray-700">
                        {reviewQuestion.explanation}
                      </p>
                      {reviewQuestion.sourceUrl && (
                        <a
                          href={reviewQuestion.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-flex text-sm font-semibold text-gray-500 underline underline-offset-4 hover:text-black"
                        >
                          Source: {reviewQuestion.sourceLabel ?? "Reference"}
                        </a>
                      )}
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
