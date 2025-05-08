interface NavbarProps {
    className?: string;
  }
  
  export const Navbar = ({ className = '' }: NavbarProps) => {
    return (
      <nav className={`navbar ${className}`}>
        <div className="navbar__container">
          <button 
            className="navbar__burger-button" 
            aria-label="Menu" 
            type="button"
          >
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </nav>
    );
  };