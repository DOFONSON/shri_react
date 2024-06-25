import React from 'react';
import cn from 'classnames';
export type InputProps = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'value'
> & {
    value?: string;
    onChange: (value: string) => void;
    afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ value, onChange, afterSlot, className, disabled, ...props }, ref) => {
        const handleChange = React.useCallback(
            (event: React.ChangeEvent<HTMLInputElement>): void => {
                onChange(event.target.value)
            },
            [onChange]
        )
        return (
            <label className='srchinp_label'>
                <input
                    {...props}
                    ref={ref}
                    value={value}
                    onChange={handleChange}
                    type='text'
                    className={className === 'search__input_input' ? cn('srchinp_input', 'super_input') : 'super_input'}
                />
                {afterSlot && <div className='input_icon'></div>}
            </label >
        );
    }
);

export default Input;
