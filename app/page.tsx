import GithubMark from './GithubMark';
import styles from './page.module.css';

export default function Home() {
  return (
    <>
      <main>
        Hello
        <div className={styles.container}>
          <section className={styles.section}>
            <h1>Kaiichiro Ota</h1>
            <ul>
              <li>
                <a
                  href="https://github.com/kigh-ota"
                  target="_blank"
                  className={styles.icon}
                >
                  <GithubMark />
                </a>
              </li>
              <li>
                <a href="https://x.com/kigh" target="_blank">
                  X (@kigh)
                </a>
              </li>
              <li>
                <a href="https://kigh-memo.hatenablog.com/" target="_blank">
                  Hatena Blog
                </a>
              </li>
              <li>
                <a href="https://speakerdeck.com/kaiichiro" target="_blank">
                  Speaker Deck
                </a>
              </li>
            </ul>
          </section>
          <section className={styles.section}>Section 2</section>
          <section className={styles.section}>Section 3</section>
          <section className={styles.section}>Section 4</section>
          <section className={styles.section}>Section 5</section>
          <section className={styles.section}>Section 6</section>
        </div>
      </main>
    </>
  );
}
