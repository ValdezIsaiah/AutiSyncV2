import React, { useEffect, useState } from 'react';
import questionsService from '../lib/questionsService';

export default function ActivityQuestions({ activityId }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuestions() {
      setLoading(true);
      const { data, error } = await questionsService.getQuestionsByActivity(activityId);
      if (!error) setQuestions(data || []);
      setLoading(false);
    }
    if (activityId) fetchQuestions();
  }, [activityId]);

  if (loading) return <div>Loading questions...</div>;

  return (
    <div>
      <h2>Questions for Activity {activityId}</h2>
      <ul>
        {questions.map(q => (
          <li key={q.id}>{q.question_text}</li>
        ))}
      </ul>
    </div>
  );
}