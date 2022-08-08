import type { NextPage } from 'next';
import Head from 'next/head';
import { useAccount } from 'wagmi';
import { Account, ConnectWallet, FileUpload } from '../components';
import { Approve } from '../components/Approve';
import { useIsMounted } from '../hooks';
import { FileData } from '../interfaces/file-data';
import styles from '../styles/Home.module.css';
const Papa = require('papaparse');

const Home: NextPage = () => {
	const isMounted = useIsMounted();
	const { isConnected } = useAccount();
	const recipients: unknown[] = [];
	const parseFile = (file: unknown) => {
		file
			? Papa.parse(file, {
					header: true,
					skipEmptyLines: true,
					complete: (results: FileData) => {
						results.data.map((el) => {
							Object.entries(el).map(([key, value]) => {
								if (key === 'memberAddress' || key === 'address') {
									recipients.push(value);
								}
							});
						});
						console.log(recipients);
					},
					error: (error: unknown) => console.error(error),
			  })
			: null;
	};
	return (
		<div className={styles.container}>
			<Head>
				<title>NFT Volley</title>
				<meta name='description' content='An efficient multi-sender for ERC721 tokens' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>NFT Volley</h1>
				<p className={styles.description}>An efficient multi-sender for ERC721 tokens.</p>
				{isMounted && isConnected && (
					<>
						<Account />
						<FileUpload parseFile={parseFile} />
						<Approve />
					</>
				)}
				{!isConnected && <ConnectWallet />}
				<a
					target='_blank'
					rel='noreferrer'
					className={styles.link}
					href='https://etherscan.io/address/0x139406b446bccc8aa6b328ff29385a7495d78043'>
					etherscan &#x1f517;
				</a>
			</main>
		</div>
	);
};

export default Home;
