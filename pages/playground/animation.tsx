import styles from '@/pages/playground/animation.module.css'

const Animation = () => {
    return (
        <div className="flex flex-col min-h-screen items-center justify-center">
            <div className={styles.red_bg}>Test Animation</div>
            <div className={styles.animation}></div>
        </div>
    );
}

export default Animation;