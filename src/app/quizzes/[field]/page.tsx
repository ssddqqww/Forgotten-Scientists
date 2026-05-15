import { notFound } from "next/navigation";
import { fieldQuizzes, getQuizBySlug } from "../../../../data/quizzes";
import QuizRunner from "./QuizRunner";

type QuizPageProps = {
  params: Promise<{ field: string }>;
};

export function generateStaticParams() {
  return fieldQuizzes.map((quiz) => ({ field: quiz.slug }));
}

export default async function QuizPage({ params }: QuizPageProps) {
  const { field } = await params;
  const quiz = getQuizBySlug(field);

  if (!quiz) {
    notFound();
  }

  return <QuizRunner quiz={quiz} />;
}
