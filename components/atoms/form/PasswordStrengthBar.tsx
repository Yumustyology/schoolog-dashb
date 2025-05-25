import { poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';

export const calculatePasswordStrength = (password: string) => {
  let score = 0;
  const checks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    numbers: /\d/.test(password),
    symbols: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
  };

  if (checks.length) score += 20;
  if (checks.lowercase) score += 20;
  if (checks.uppercase) score += 20;
  if (checks.numbers) score += 20;
  if (checks.symbols) score += 20;

  let strength = 'Very Weak';
  let color = '#ef4444'; 
  if (score >= 80) {
    strength = 'Very Strong';
    color = '#10b981'; 
  } else if (score >= 60) {
    strength = 'Strong';
    color = '#f59e0b';
  } else if (score >= 40) {
    strength = 'Medium';
    color = '#f97316';
  } else if (score >= 20) {
    strength = 'Weak';
    color = '#ef4444';
  }

  return { score, strength, color, checks };
};

const PasswordStrengthBar = ({ password }: { password: string }) => {
  const { score, strength, color, checks } =
    calculatePasswordStrength(password);

  return (
    <div className={cn('mt-2 space-y-2', poppins_500.className)}>
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${score}%`,
            backgroundColor: color,
            boxShadow: `0 0 10px ${color}40`,
          }}
        />
      </div>

      {/* Strength Text */}
      {password && (
        <div className="flex justify-between items-center text-sm">
          <span style={{ color }} className="font-medium">
            Password Strength: {strength}
          </span>
          <span className="text-gray-500">{score}/100</span>
        </div>
      )}

      {/* Requirements Checklist */}
      {password && (
        <div
          className={cn(
            'grid grid-cols-2 gap-1 text-xs mt-3',
            poppins_500.className
          )}
        >
          <div
            className={`flex items-center gap-1 ${checks.length ? 'text-green-600' : 'text-gray-400'}`}
          >
            <span className={`text-xs ${checks.length ? '✓' : '○'}`}>
              {checks.length ? '✓' : '○'}
            </span>
            8+ characters
          </div>
          <div
            className={`flex items-center gap-1 ${checks.lowercase ? 'text-green-600' : 'text-gray-400'}`}
          >
            <span className={`text-xs ${checks.lowercase ? '✓' : '○'}`}>
              {checks.lowercase ? '✓' : '○'}
            </span>
            Lowercase letter
          </div>
          <div
            className={`flex items-center gap-1 ${checks.uppercase ? 'text-green-600' : 'text-gray-400'}`}
          >
            <span className={`text-xs ${checks.uppercase ? '✓' : '○'}`}>
              {checks.uppercase ? '✓' : '○'}
            </span>
            Uppercase letter
          </div>
          <div
            className={`flex items-center gap-1 ${checks.numbers ? 'text-green-600' : 'text-gray-400'}`}
          >
            <span className={`text-xs ${checks.numbers ? '✓' : '○'}`}>
              {checks.numbers ? '✓' : '○'}
            </span>
            Number
          </div>
          <div
            className={`flex items-center gap-1 ${checks.symbols ? 'text-green-600' : 'text-gray-400'} col-span-2`}
          >
            <span className={`text-xs ${checks.symbols ? '✓' : '○'}`}>
              {checks.symbols ? '✓' : '○'}
            </span>
            Special character (!@#$%^&*)
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordStrengthBar;
