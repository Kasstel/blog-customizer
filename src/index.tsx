import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [formState, setFormState] = useState(defaultArticleState);
	const [appliedState, setAppliedState] = useState(defaultArticleState);
	const [isOpen, setIsOpen] = useState(false);

	const handleApply = () => {
		setAppliedState(formState);
		setIsOpen(false);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		setAppliedState(defaultArticleState);
		setIsOpen(false);
	};

	const appliedStyles = (state: typeof defaultArticleState) => {
		return {
			'--font-family': state.fontFamilyOption.value,
			'--font-size': state.fontSizeOption.value,
			'--font-color': state.fontColor.value,
			'--container-width': state.contentWidth.value,
			'--bg-color': state.backgroundColor.value,
		} as CSSProperties;
	};

	return (
		<main className={clsx(styles.main)} style={appliedStyles(appliedState)}>
			<ArticleParamsForm
				isOpen={isOpen}
				onToggle={() => {
					setIsOpen((prev) => !prev);
				}}
				onApply={handleApply}
				onReset={handleReset}
				formState={formState}
				setFormState={setFormState}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
