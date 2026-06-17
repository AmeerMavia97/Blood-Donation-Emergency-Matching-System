import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"

const InputField = ({
  label,
  type = "text",
  placeholder,
  icon: Icon,
  rightIcon: RightIcon,
  error,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === "password"
  const inputType = isPassword && showPassword ? "text" : type
  const ToggleIcon = showPassword ? EyeOff : (RightIcon || Eye)

  return (
    <div>
      <label className="mb-2 font-para block text-sm font-bold text-[#151515]">
        {label}
      </label>

      <div className="relative">
        {Icon && (
          <Icon className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#dc2626]" />
        )}

        <input
          type={inputType}
          placeholder={placeholder}
          autoComplete={isPassword ? "new-password" : props.autoComplete}
          className={`h-12.5 w-full rounded-lg font-para border bg-white px-4 text-sm font-medium text-[#151515] outline-none transition placeholder:text-[#8a8a8a] focus:border-[#dc2626]  ${
            error ? "border-[#dc2626]" : "border-black/10"
          } ${Icon ? "pl-12" : ""} ${isPassword || RightIcon ? "pr-12" : ""}`}
          {...props}
        />

        {isPassword ? (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#777] transition hover:text-[#dc2626]"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <ToggleIcon className="size-5" />
          </button>
        ) : RightIcon ? (
          <RightIcon className="absolute right-4 top-1/2 size-5 -translate-y-1/2 text-[#777]" />
        ) : null}
      </div>

      {error && (
        <p className="mt-2 text-xs font-bold text-[#dc2626]">
          {error.message}
        </p>
      )}
    </div>
  )
}

export default InputField
