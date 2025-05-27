import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';

import styles from './ArticleParamsForm.module.scss';
import {
	defaultArticleState,
	fontFamilyOptions,
	ArticleStateType,
	OptionType,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import clsx from 'clsx';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import { useRef, useEffect, useState } from 'react';

type ArticleParamsFormProps = {
	isOpen: boolean;
	onToggle: () => void;
	setAppliedState: (state: typeof defaultArticleState) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [formState, setFormState] = useState(defaultArticleState);

	const ref = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				props.onToggle();
			}
		};
		if (props.isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [props.isOpen, props.onToggle]);

	const handleOptionChange =
		(field: keyof ArticleStateType) => (selectedOption: OptionType) => {
			setFormState({
				...formState,
				[field]: selectedOption,
			});
		};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		props.onToggle();
		props.setAppliedState(formState);
	};

	const handleReset = () => {
		props.onToggle();
		setFormState(defaultArticleState);
		props.setAppliedState(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={props.isOpen} onClick={props.onToggle} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: props.isOpen,
				})}
				ref={ref}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<div className={styles.spacing}>
						<Text as='h1' size={31} weight={800} uppercase>
							Задайте параметры
						</Text>
					</div>
					<div className={styles.spacing}>
						<Select
							title='Шрифт'
							options={fontFamilyOptions}
							selected={formState.fontFamilyOption}
							onChange={handleOptionChange('fontFamilyOption')}
						/>
					</div>
					<div className={styles.spacing}>
						<RadioGroup
							title='Размер шрифта'
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							name='Размер шрифта'
							onChange={handleOptionChange('fontSizeOption')}
						/>
					</div>
					<div className={styles.spacing}>
						<Select
							title='Цвет шрифта'
							options={fontColors}
							selected={formState.fontColor}
							onChange={handleOptionChange('fontColor')}
						/>
					</div>
					<div className={styles.spacing}>
						<Separator />
					</div>
					<div className={styles.spacing}>
						<Select
							title='Цвет фона'
							options={backgroundColors}
							selected={formState.backgroundColor}
							onChange={handleOptionChange('backgroundColor')}
						/>
					</div>
					<div className={styles.spacing}>
						<Select
							title='Ширина контента'
							options={contentWidthArr}
							selected={formState.contentWidth}
							onChange={handleOptionChange('contentWidth')}
						/>
					</div>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
