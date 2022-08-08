import Image from 'next/image';
import { FC } from 'react';
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi';
import styles from '../styles/Home.module.css';
import { formatAddress } from '../utils/methods';

export const Account: FC<React.PropsWithChildren<unknown>> = () => {
	const { address } = useAccount();
	const { data: ensAvatar } = useEnsAvatar({ addressOrName: address });
	const { data: ensName } = useEnsName({ address });
	const { disconnect } = useDisconnect();
	return (
		<div className={styles.column}>
			{ensAvatar ? <Image src={ensAvatar} alt='ENS Avatar' /> : ''}
			<p className={styles.description}>
				Connected as{' '}
				<span className={styles.address}>
					{ensName ? `${ensName} (${formatAddress(address)})` : formatAddress(address)}
				</span>
			</p>
			<button className={styles.button} onClick={() => disconnect()}>
				Disconnect
			</button>
		</div>
	);
};
