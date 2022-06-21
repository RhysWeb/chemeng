import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Home() {
	return (
		<div className={styles.container}>
			<Head>
				<title>Rhys Balmforth</title>
				<meta name="description" content="My personal site by Rhys Balmforth" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>Hello</h1>
			</main>
		</div>
	);
}
