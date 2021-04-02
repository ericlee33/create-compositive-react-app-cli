import styles from './button.module.scss';
import { Link } from 'react-router-dom';

const Button = ({
    onClickButton = () => {},
    text = '',
    customStyle = {},
    // toPath = '',
    // needLink = true,
}) => {
    const btnText = text || '下一步';
    return (
        <button onClick={onClickButton} className={styles['next-step-btn']} style={customStyle}>
            {/* {needLink ? (
                <Link className={styles['link-btn']} to={toPath}>
                    {btnText}
                </Link>
            ) : ( */}
            <span>{btnText}</span>
            {/* )} */}
        </button>
    );
};

export default Button;
