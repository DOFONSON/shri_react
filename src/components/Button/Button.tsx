import cn from 'clsx'
import styles from './style.module.css'

interface ButtonProps {
    inverse: boolean,
    func?: any,
    text: string,
    type: "submit" | "reset" | "button" | undefined
}

const Button: React.FC<ButtonProps> = ({inverse, func, text, type}) => {
    return(
        !inverse ?
        <button className={cn(styles.btn, styles.stan_btn)} onClick={func} type={type}>{text}</button> :
        <button className={cn(styles.btn, styles.inverse_btn)} onClick={func} type={type}>{text}</button>
    )
}

export default Button