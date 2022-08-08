import { FC } from 'react';
import { useAccount, useConnect } from 'wagmi';
import { useIsMounted } from '../hooks';
import styles from '../styles/Home.module.css';

export const ConnectWallet: FC<React.PropsWithChildren<unknown>> = () => {
	const isMounted = useIsMounted();
	const { connector } = useAccount();
	const { connect, connectors, error, isLoading, pendingConnector } = useConnect();

	return (
		<div>
			<p className={styles.description}>Connect wallet</p>
			<div className={styles.grid}>
				{connectors
					.filter((x) => isMounted && x.ready && x.id !== connector?.id)
					.map((x) => (
						<button className={styles.button} disabled={!x.ready} key={x?.id} onClick={() => connect({ connector: x })}>
							{x.name}
							{!x.ready && ' (unsupported)'}
							{isLoading && x?.id === pendingConnector?.id && ' (connecting)'}
						</button>
					))}
			</div>
			{error && <div className={styles.error}>⚠️ {error.message}...</div>}
		</div>
	);
};
