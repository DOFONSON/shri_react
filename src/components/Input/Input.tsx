import React from 'react';
import cn from 'classnames';
import styles from './style.module.css'
export type InputProps = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'value'
> & {
    value?: string;
    holder?: string;
    onChange: (value: string) => void;
    afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ value, onChange, afterSlot, className, disabled, holder, ...props }, ref) => {
        const handleChange = React.useCallback(
            (event: React.ChangeEvent<HTMLInputElement>): void => {
                onChange(event.target.value)
                
            },
            [onChange]
        )
        
        return (
            <label className='srchinp_label'>
                {holder ? <input
                    {...props}
                    ref={ref}
                    value={value}
                    onChange={handleChange}
                    type='text'
                    className={cn(className, className === 'search__input_input' ? cn(styles.srchinp_input, styles.super_input) : styles.super_input)}
                    placeholder={holder}
                /> : <input
                {...props}
                ref={ref}
                value={value}
                onChange={handleChange}
                type='text'
                className={cn(className, className === 'search__input_input' ? cn(styles.srchinp_input, styles.super_input) : styles.super_input)}
            />
                }
                {afterSlot && <div className={styles.input_icon}>{afterSlot}</div>}
            </label >
        );
    }
);

export default Input;
