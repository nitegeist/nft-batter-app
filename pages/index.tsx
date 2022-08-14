import type { NextPage } from 'next';
import Head from 'next/head';
import { useAccount } from 'wagmi';
import { Account, Approve, ConnectWallet, TextField } from '../components';
import { useIsMounted } from '../hooks';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
	const isMounted = useIsMounted();
	const { isConnected } = useAccount();
	const recipients: string[] = [];
	const tokens: string[] = [];
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
						<TextField recipients={recipients} tokens={tokens} />
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
