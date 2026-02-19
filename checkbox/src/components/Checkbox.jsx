import { useState } from "react";

export default function CheckBox() {
  const [checked, setChecked] = useState(false);

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
      <a>  Accept Terms</a>
      </label>

      <p>{checked ? "Accepted ✅" : "Not Accepted ❌"}</p>
    </div>
  );
}