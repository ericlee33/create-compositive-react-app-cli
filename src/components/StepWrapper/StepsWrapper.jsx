import { withRouter, useHistory } from 'react-router-dom';
import styles from './StepsWrapper.module.scss';
import Header from '../../layouts/header/header';
import { useIntl } from 'react-intl';

const StepWrapper = ({ children, donePercent = 0, needBack = true, onClickBack }) => {
    const { messages } = useIntl();

    return (
        <>
            <div className={styles.container}>
                <Header
                    title={messages['title.openact']}
                    needBack={needBack}
                    onClickBack={onClickBack}
                ></Header>
                <div className={styles.progress}>
                    <div className={styles.percent}>开户进度：{donePercent}%</div>

                    <div className={styles.done} style={{ flex: donePercent }}></div>
                    <div className={styles.remaining} style={{ flex: 100 - donePercent }}></div>
                </div>

                <div className={styles.wrapper}>{children}</div>

                {/* <div className={styles['service-container']}>
                    <div className={styles['service-desc']}>开户过程中遇任何问题</div>
                    <div className={styles['service-desc']}>
                        请拨打400-097-6600，联系华兴资本财富客服
                    </div>
                </div> */}
            </div>
        </>
    );
};
export default withRouter(StepWrapper);
