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
import { useRef, useEffect } from 'react';

type ArticleParamsFormProps = {
	isOpen: boolean;
	onToggle: () => void;
	onApply: () => void;
	onReset: () => void;
	formState: typeof defaultArticleState;
	setFormState: (state: typeof defaultArticleState) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
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
			props.setFormState({
				...props.formState,
				[field]: selectedOption,
			});
		};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		props.onApply();
		props.onToggle();
	};

	const handleReset = () => {
		props.onReset();
		props.onToggle();
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
							selected={props.formState.fontFamilyOption}
							onChange={handleOptionChange('fontFamilyOption')}
						/>
					</div>
					<div className={styles.spacing}>
						<RadioGroup
							title='Размер шрифта'
							options={fontSizeOptions}
							selected={props.formState.fontSizeOption}
							name='Размер шрифта'
							onChange={handleOptionChange('fontSizeOption')}
						/>
					</div>
					<div className={styles.spacing}>
						<Select
							title='Цвет шрифта'
							options={fontColors}
							selected={props.formState.fontColor}
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
							selected={props.formState.backgroundColor}
							onChange={handleOptionChange('backgroundColor')}
						/>
					</div>
					<div className={styles.spacing}>
						<Select
							title='Ширина контента'
							options={contentWidthArr}
							selected={props.formState.contentWidth}
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
