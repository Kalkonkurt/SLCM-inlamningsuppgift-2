import './Button.css';

function Button({ variant = 'primary', onClick, type = 'button', children }) {
	return (
		<button type={type} className={`btn btn-${variant}`} onClick={onClick}>
			{children}
		</button>
	);
}

export default Button;
