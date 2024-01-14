import { Link } from "react-router-dom"

function Button({ children, disabled, to, type, onClick }) {
  const base = `inline-block rounded-full bg-yellow-400 font-semibold uppercase tracking-wide transition-colors
   duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300
    focus:ring-offset-2 disabled:cursor-not-allowed`;

  const styles = {
    base,
    primary: base + ' text-sm px-3 py-2 sm:py-4 sm:px-6',
    small: base + ' px-4 py-2 md:px-5 md:py-2.5 text-xs',
    xsmall: base + ' h-7 w-7 flex items-center justify-center',
    secondary: `inline-block text-sm rounded-full border-2 border-stone-300 font-semibold uppercase tracking-wide transition-colors
    duration-300 disabled:cursor-not-allowed px-4 py-2.5 sm:py-3.5 sm:px-6 text-stone-400 hover:text-stone-800 hover:bg-stone-300 focus:text-stone-800 focus:bg-stone-300 focus:ring focus:outline-none
    focus:ring-offset-2 focus:ring-stone-200`
  }

  if (to)
    return <Link to={to} className={styles[type]}>{children}</Link>

  if (onClick)
    return <button disabled={disabled}
      className={styles[type]}
      onClick={onClick}
    >
      {children}
    </button>

  return (
    <button disabled={disabled}
      className={styles[type]}
    >
      {children}
    </button>
  )
}

export default Button
