import "../styles/components/button.styles.scss";

interface btn {
  text: string;
  color: string;
  func?: () => void;
}

const Button = ({ text, func, color }: btn) => {
  return (
    <div className="btn-container">
      <button
        className={color === "primary" ? "add-btn-primary" : "add-btn-danger"}
        onClick={func}
      >
        {text}
      </button>
    </div>
  );
};

export default Button