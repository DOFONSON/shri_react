import React, { useState, useEffect, useRef } from 'react';
import Input from '../../../Input/Input';
import cn from 'clsx';

export type Option = {
    key: string;
    value: string;
};

export type MultiDropdownProps = {
    className?: string;
    options: Option[];
    value: Option | undefined; // Тип изменен на Option | undefined
    onChange: (value: Option | undefined) => void; // Тип изменен на Option | undefined
    disabled?: boolean;
    getTitle: (value: Option | undefined) => string; // Тип изменен на Option | undefined
    singleSelect?: boolean; // Новый prop для указания одиночного выбора
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
        <div className={cn(className, 'multi_drop')} ref={wrapperRef}>
            <Input
                className="multi_drop_field"
                onClick={open}
                disabled={disabled}
                placeholder={title}
                value={opened ? filter : isEmpty ? '' : title}
                onChange={setFilter}
                ref={ref}
            />
            {opened && (
                <div className='multi__options'>
                    {filteredOptions.map(option => (
                        <button
                            key={option.key}
                            className={cn('multi_drop_option', value?.key === option.key && 'multi_drop_option_selected')}
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
