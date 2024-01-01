function Button({children,disabled}) {
  return (
    <button disabled={disabled}
    className="inline-block rounded-full bg-yellow-400 px-4 py-3 text-xs font-semibold uppercase tracking-wide transition-colors
     duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300
      focus:ring-offset-2 disabled:cursor-not-allowed sm:py-4 sm:px-6"
  >
      {children}
    </button>
  )
}

export default Button
