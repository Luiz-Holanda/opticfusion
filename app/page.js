import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1>
            OPTIC FUSION
          </h1>
          <p>
            Fotografia inteligente movida por IA. Projeto migrado para Next.js + React.
          </p>
          <p>
            Edite o arquivo <code className={styles.code}>app/page.js</code> para começar a desenvolver.
          </p>
        </div>
      </main>
    </div>
  );
}
