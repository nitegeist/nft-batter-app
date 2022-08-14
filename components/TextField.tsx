import { FC } from 'react';
import styles from '../styles/Home.module.css';

interface Props {
	recipients: string[];
	tokens: string[];
}

export const TextField: FC<React.PropsWithChildren<Props>> = ({ recipients, tokens }) => {
	const handleInputChange = (value: string) => {
		const values = value.split(',').map((val) => val.replace(/[^a-zA-Z0-9 ]/g, '').trim());
		recipients = values.filter((val) => val.includes('0x'));
		tokens = values.filter((val) => !val.includes('0x'));
		console.log({ values, recipients, tokens });
	};
	return (
		<form className={styles.column}>
			<div className={styles.customField}>
				<label htmlFor='get-values'>Enter addresses and tokens</label>
				<textarea
					name='get-values'
					id='get-values'
					placeholder='0x70997970c51812dc3a010c7d01b50e0d17dc79c8,1,
					0x70997970c51812dc3a010c7d01b50e0d17dc79c8,2,
					0x801efbcffc2cf572d4c30de9cee2a0afebfa1ce1,3,
					0x7ddc72eb160f6a325A5927299b2715abd0bea55b,4'
					onChange={(e) => handleInputChange(e.target.value)}
				/>
			</div>
		</form>
	);
};
