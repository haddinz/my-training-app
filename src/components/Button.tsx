import "../styles/components/button.styles.scss";

interface btn {
  children: React.ReactNode;
  func?: () => void;
}

const Primary = ({ children, func }: btn) => {
  return (
    <div className="btn-container">
      <button className="add-btn-primary" onClick={func}>
        {children}
      </button>
    </div>
  );
};

const Danger = ({ children, func }: btn) => {
  return (
    <div className="btn-container">
      <button className="add-btn-danger" onClick={func}>
        {children}
      </button>
    </div>
  );
};

const Button = {
  Primary,
  Danger,
};

export default Button
