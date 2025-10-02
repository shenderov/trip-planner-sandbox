import React, { useState } from "react";
import type { Preferences } from "../../../shared/types";
import { TEST_IDS } from "../../../shared/testIds";
import "./QuestionForm.css";

type Props = {
  onSubmit: (data: Preferences) => void;
};

export const QuestionForm: React.FC<Props> = ({ onSubmit }) => {
  const [form, setForm] = useState<Preferences>({
    preference: "",
    budget: "",
    companions: "",
    climate: "",
    duration: "",
  });

  const update =
    (key: keyof Preferences) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  const fields: { key: keyof Preferences; placeholder: string }[] = [
    {
      key: "preference",
      placeholder:
        "Do you prefer beaches, mountains, cities, or something else?",
    },
    { key: "budget", placeholder: "What is your budget?" },
    {
      key: "companions",
      placeholder: "Are you traveling alone, with a partner, or with family?",
    },
    { key: "climate", placeholder: "Preferred climate: hot, mild, cold?" },
    { key: "duration", placeholder: "How long are you planning to travel?" },
  ];

  return (
    <form className="trip-form" onSubmit={handleSubmit} data-testid={TEST_IDS.form.container}>
      <h2 className="trip-title" data-testid={TEST_IDS.form.title}>
        Plan Your Perfect Trip ✈️
      </h2>

      {fields.map(({ key, placeholder }) => (
        <input
          key={key}
          className="trip-input"
          type="text"
          placeholder={placeholder}
          value={form[key]}
          onChange={update(key)}
          required
          data-testid={TEST_IDS.form.inputs[key]}
        />
      ))}

      <button
        type="submit"
        className="trip-button"
        disabled={Object.values(form).every((v) => !v)}
        data-testid={TEST_IDS.form.submit}
      >
        Get Suggestions
      </button>
    </form>
  );
};
