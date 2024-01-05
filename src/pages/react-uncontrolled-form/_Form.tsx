import { type FormEventHandler, useState } from "react";

export const Form = () => {
  const [output, setOutput] = useState("submitした内容がここに出る");
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const entries = [...data.entries()];
    setOutput(JSON.stringify(entries, null, 2));
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>
        <label>
          name:
          <input type="text" name="text" defaultValue="こんにちは" />
        </label>
      </p>
      <p>
        <label>
          select:
          <select name="select" required>
            <option>えらぶ</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </label>
      </p>
      <p>
        radio:
        <label>
          <input type="radio" name="radio" value="1" defaultChecked />
          one
        </label>
        <label>
          <input type="radio" name="radio" value="2" />
          two
        </label>
      </p>
      <p>
        checkbox:
        <label>
          <input type="checkbox" name="check" value="1" />
          one
        </label>
        <label>
          <input type="checkbox" name="check" value="2" />
          two
        </label>
      </p>
      <p>
        <button type="submit">submit</button>
      </p>
      <output>
        <pre>{output}</pre>
      </output>
    </form>
  );
};
