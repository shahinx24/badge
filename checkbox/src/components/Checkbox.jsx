import { useState } from "react";
import { Link } from "react-router-dom";

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
        <Link to="/terms"> Accept Terms </Link>
      </label>

      <p>{checked ? "Accepted ✅" : "Not Accepted ❌"}</p>
    </div>
  );
}