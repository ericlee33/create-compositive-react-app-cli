import { useLocation, useHistory } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import styles from './header.module.scss';

// function getTitle(lang, pathname) {
//     return titleMap[lang][pathname];
// }

/**
 * 参数
 * needBack boolean default: true
 * title string default: ''
 */
const Header = ({
    title = '',
    needBack = true,
    needCompleted = false,
    onClickCompleted = () => {},
    onClickBack,
    headerBgColor = '#fff',
}) => {
    // const { pathname } = useLocation();
    // const title = getTitle(props.lang, pathname);

    let history = useHistory();

    !onClickBack &&
        (onClickBack = () => {
            /** history stack === 1 */
            if (history.length === 1) {
                history.length === 1 && history.push('/login');
            } else {
                history.goBack();
            }
        });

    return (
        <div className={styles.header} style={{ backgroundColor: headerBgColor }}>
            {needBack && (
                <div className={styles['back-wrap']} onClick={onClickBack}>
                    <LeftOutlined
                        style={{ fontSize: '0.444rem' }}
                        className={styles['back-icon']}
                    />
                </div>
            )}

            <div className={styles.title}>{title}</div>

            {needCompleted && (
                <div className={styles.completed} onClick={onClickCompleted}>
                    <span className={styles.text}>完成</span>
                </div>
            )}
        </div>
    );
};

export default connect(state => ({ lang: state.config.lang }))(Header);
