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
    value: Option[];
    onChange: (value: Option[]) => void;
    disabled?: boolean;
    getTitle: (value: Option[]) => string;
    renderReposStore: any;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({ className, options, value, onChange, disabled, getTitle, renderReposStore }) => {
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
    const isEmpty = value.length === 0;

    const filteredOptions = options.filter(o => o.value.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) === 0);

    const selectedKeysSet = new Set(value.map(({ key }) => key));
    
    const onSelect = (option: Option) => {
        
        if (disabled) {
            return;
        }
        const updatedValue = selectedKeysSet.has(option.key)
            ? value.filter(({ key }) => key !== option.key)
            : [...value, option];

        
        onChange(updatedValue);
        
        renderReposStore.multiStore.selectedTags = updatedValue;
        renderReposStore.filterRepos(renderReposStore.multiStore.selectedTags)
        renderReposStore.changePage(1)
        ref.current?.focus();
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
                            className={cn('multi_drop_option', selectedKeysSet.has(option.key) && 'multi_drop_option_selected')}
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
