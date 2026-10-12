// Bouton / lien réutilisable. Avec "href" : lien <a>, sinon vrai <button>.
const sizes = {
  md: "min-h-12 px-6 py-3 text-base",
  sm: "min-h-10 px-4 py-2 text-sm",
};

const variants = {
  primary: "bg-forest text-white hover:bg-forest-dark",
  pink: "bg-pink text-white hover:bg-pink-dark",
  mango: "bg-mango text-ink hover:bg-white",
  whatsapp: "bg-wa text-white hover:bg-wa-dark",
  outline: "border-2 border-ink text-ink hover:bg-ink hover:text-white",
  outlineLight: "border-2 border-white text-white hover:bg-white hover:text-forest",
};

export default function Button({
  variant = "primary",
  size = "md",
  href,
  external = false,
  icon: Icon,
  className = "",
  children,
  type = "button",
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${sizes[size]} ${variants[variant]} ${className}`;
  const content = (
    <>
      {Icon && <Icon size={20} aria-hidden="true" />}
      {children}
      {external && <span className="sr-only"> (s'ouvre dans un nouvel onglet)</span>}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...props}
      >
        {content}
      </a>
    );
  }
  return (
    <button type={type} className={classes} {...props}>
      {content}
    </button>
  );
}
