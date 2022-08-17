import { FC } from 'react';
import styles from '../styles/Home.module.css';

interface Props {
	setApproveAddress: Function;
}

export const Approve: FC<React.PropsWithChildren<Props>> = ({ setApproveAddress }) => {
	return (
		<form className={styles.column}>
			<div className={styles.customField}>
				<label>Contract Address for Approval</label>
				<input
					name='approval-address'
					id='approval-address'
					placeholder='0x70997970c51812dc3a010c7d01b50e0d17dc79c8'
					onChange={(e) => setApproveAddress(e.target.value)}
				/>
			</div>
			<button className={styles.button}>Approve</button>
		</form>
	);
};
