import React, { useState, useEffect, useRef } from 'react';
import Input from '../../../../../../../components/Input/Input';
import cn from 'clsx';
import styles from './style.module.css'
import MultiIcon from './MultiIcon';
export type Option = {
    key: string;
    value: string;
};

export type MultiDropdownProps = {
    className?: string;
    options: Option[];
    value: Option | undefined; 
    onChange: (value: Option | undefined) => void; 
    disabled?: boolean;
    getTitle: (value: Option | undefined) => string; 
    singleSelect?: boolean;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({ className, options, value, onChange, disabled, getTitle, singleSelect }) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const ref = useRef<HTMLInputElement>(null);
    const [filter, setFilter] = useState('');
    const [isOpened, setIsOpened] = useState(false);

    useEffect(() => {
        const handlerClick = (e: MouseEvent) => {
            if (!wrapperRef.current?.contains(e.target as HTMLElement)) {
                setIsOpened(false);
            }
        };
        window.addEventListener('click', handlerClick);
        return () => {
            window.removeEventListener('click', handlerClick);
        };
    }, []);

    useEffect(() => {
        if (isOpened) {
            setFilter('');
        }
    }, [isOpened]);

    const title = getTitle(value);
    const isEmpty = value === undefined;

    const filteredOptions = options.filter(o => o.value.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) === 0);

    const onSelect = (option: Option) => {
        if (disabled) {
            return;
        }
        const updatedValue = singleSelect ? option : value?.key === option.key ? undefined : option;
        onChange(updatedValue);
        setIsOpened(false);
    };

    const open = () => {
        setIsOpened(true);
    };

    const opened = isOpened && !disabled;

    return (
        <div className={cn(className, styles.multi_drop)} ref={wrapperRef}>
            <Input
                className={styles.multi_drop_field}
                onClick={open}
                disabled={disabled}
                placeholder={title}
                value={opened ? filter : isEmpty ? '' : title}
                onChange={setFilter}
                ref={ref}
            />
            <MultiIcon className={styles.multi__icon} orientation={isOpened ? 'top' : 'bot'} />

            {opened && (
                <div className={styles.multi__options}>
                    {filteredOptions.map(option => (
                        <button
                            key={option.key}
                            className={cn(styles.multi_drop_option, value?.key === option.key && styles.multi_drop_option_selected)}
                            onClick={() => onSelect(option)}
                        >
                            {option.value}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MultiDropdown;
