import { ChangeEvent, FC } from 'react';
import styles from '../styles/Home.module.css';

interface Props {
	parseFile: (file: unknown) => void;
}

export const FileUpload: FC<React.PropsWithChildren<Props>> = ({ parseFile }) => {
	const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
		let { value, files } = e.target;
		var regex = new RegExp('(.*?).(csv)$');
		if (!regex.test(value.toLowerCase())) {
			value = '';
			alert('Please select correct file format');
		} else {
			files && files.length ? parseFile(files[0]) : null;
		}
	};

	return (
		<form className={styles.column}>
			<div className={styles.customField}>
				<label htmlFor='upload-file'>Upload CSV File</label>
				<input
					type='file'
					name='upload-file'
					id='upload-file'
					accept='text/csv, application/csv'
					onChange={handleFileSelect}
				/>
			</div>
		</form>
	);
};
