import styles from './MyGrid.module.css';

export function MyGrid() {
    return (
        <div className={styles.container}>
            <header className={styles.header1} />
            <header className={styles.header2} />
            <aside className={styles.aside1} />
            <aside className={styles.aside2} />
            <div className={styles.main}>
                <div className={styles.grid}>
                    <div className={styles.card}>
                        <h2>Card 1</h2>
                        <p>This is a card.</p>
                    </div>
                    <div className={styles.card}>
                        <h2>Card 2</h2>
                        <p>This is a card.</p>
                    </div>
                    <div className={styles.card}>
                        <h2>Card 3</h2>
                        <p>This is a card.</p>
                    </div>
                    <div className={styles.card}>
                        <h2>Card 4</h2>
                        <p>This is a card.</p>
                    </div>
                    <div className={styles.card}>
                        <h2>Card 5</h2>
                        <p>This is a card.</p>
                    </div>
                </div>
            </div>
            <footer className={styles.footer1} />
            <footer className={styles.footer2} />
        </div>
    );
}
