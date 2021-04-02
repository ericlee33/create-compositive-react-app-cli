import styles from './BasicWrapper.module.scss';

const BasicWrapper = ({ children }) => {
    return <div className={styles['basic-wrapper']}>{children}</div>;
};

export default BasicWrapper;
