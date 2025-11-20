import styles from './MyFooter.module.css';
import { Phone } from 'lucide-react';

export function MyFooter() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerText}>
                <h1></h1>
                <h1></h1>
                <h1></h1>
            </div>
            <p></p>
            <div className={styles.icons}>
                <a href="" target="_blank">
                <Github />
                </a>
                <a href="" target="_blank">
                <Instagram />
                </a>
                <Phone />
            </div>
        </footer>
    );
}
