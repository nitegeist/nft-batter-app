import type { NextPage } from 'next';
import Head from 'next/head';
import { ConnectWallet, FileUpload } from '../components';
import { FileData } from '../interfaces/file-data';
import styles from '../styles/Home.module.css';
const Papa = require('papaparse');

const Home: NextPage = () => {
	const memberAddresses: unknown[] = [];
	const parseFile = (file: unknown) => {
		file
			? Papa.parse(file, {
					header: true,
					skipEmptyLines: true,
					complete: (results: FileData) => {
						results.data.map((el) => {
							Object.entries(el).map(([key, value]) => {
								if (key === 'memberAddress' || key === 'address') {
									memberAddresses.push(value);
								}
							});
						});
					},
					error: (error: unknown) => console.error(error),
			  })
			: null;
	};
	return (
		<div className={styles.container}>
			<Head>
				<title>NFT Batter</title>
				<meta name='description' content='A general purpose app to airdrop nfts' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>NFT Batter</h1>
				<ConnectWallet />
				<FileUpload parseFile={parseFile} />
			</main>
		</div>
	);
};

export default Home;
