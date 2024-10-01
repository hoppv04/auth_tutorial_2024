import { Check, X } from "lucide-react";
import { useMemo } from "react";

const PasswordCriteria = ({ password }) => {
  const criteria = useMemo(
    () => [
      { label: "At least 6 characters", met: password.length >= 6 },
      { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
      { label: "Contains lowercase letter", met: /[a-z]/.test(password) },
      { label: "Contains a number", met: /\d/.test(password) },
      {
        label: "Contains special character",
        met: /[^A-Za-z0-9]/.test(password),
      },
    ],
    [password]
  );

  return (
    <div className="mt-2 space-y-1">
      {criteria.map((item) => (
        <div key={item.label} className="flex items-center text-xs">
          {item.met ? (
            <Check className="size-4 text-green-500 mr-2" />
          ) : (
            <X className="size-4 text-gray-500 mr-2" />
          )}
          <span className={item.met ? "text-green-500" : "text-gray-400"}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

const strengthTexts = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
const strengthColors = [
  "bg-red-500",
  "bg-red-400",
  "bg-yellow-500",
  "bg-yellow-400",
  "bg-green-500",
];

const PasswordStrengthMeter = ({ password }) => {
  const strength = useMemo(() => {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/\d/)) strength++;
    if (password.match(/[^a-zA-Z\d]/)) strength++;

    return strength;
  }, [password]);

  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-gray-400">Password strength</span>
        <span className="text-xs text-gray-400">{strengthTexts[strength]}</span>
      </div>

      <div className="flex space-x-1">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className={`h-1 w-1/4 rounded-full transition-colors duration-300 ${
              index < strength ? strengthColors[strength] : "bg-gray-600"
            }`}
          />
        ))}
      </div>
      <PasswordCriteria password={password} />
    </div>
  );
};

export default PasswordStrengthMeter;
