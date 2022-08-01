import Image from 'next/image';
import { FC } from 'react';
import { useAccount, useConnect, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi';
import styles from '../styles/Home.module.css';
import { formatAddress } from '../utils/methods';

export const ConnectWallet: FC<React.PropsWithChildren<unknown>> = () => {
	const { address, connector, isConnected } = useAccount();
	const { data: ensAvatar } = useEnsAvatar({ addressOrName: address });
	const { data: ensName } = useEnsName({ address });
	const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
	const { disconnect } = useDisconnect();
	if (isConnected) {
		return (
			<div className={styles.column}>
				{ensAvatar ? <Image src={ensAvatar} alt='ENS Avatar' /> : ''}
				<p className={styles.description}>
					<span className={styles.address}>
						{ensName ? `${ensName} (${formatAddress(address)})` : formatAddress(address)}
					</span>
				</p>
				<div>Connected to {connector?.name}</div>
				<button className={styles.button} onClick={disconnect}>
					Disconnect
				</button>
			</div>
		);
	}

	return (
		<>
			<div className={styles.grid}>
				{connectors.map((connector) => (
					<button
						className={styles.button}
						disabled={!connector.ready}
						key={connector.id}
						onClick={() => connect({ connector })}>
						{connector.name}
						{!connector.ready && ' (unsupported)'}
						{isLoading && connector.id === pendingConnector?.id && ' (connecting)'}
					</button>
				))}
			</div>
			{error && <div>⚠️ {error.message}</div>}
		</>
	);
};
