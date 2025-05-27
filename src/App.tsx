import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';
import clsx from 'clsx';
import styles from './styles/index.module.scss';
import { CSSProperties, useState } from 'react';

export const App = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [appliedState, setAppliedState] = useState(defaultArticleState);

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
				isOpen={isMenuOpen}
				onToggle={() => {
					setIsMenuOpen((prev) => !prev);
				}}
				setAppliedState={setAppliedState}
			/>
			<Article />
		</main>
	);
};
