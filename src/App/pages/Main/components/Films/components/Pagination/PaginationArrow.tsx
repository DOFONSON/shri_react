interface PaginationArrowProps {
    orientation: string,
    disabled: boolean
}

const PaginationArrow: React.FC<PaginationArrowProps> = ({orientation, disabled}) => {
    return (
        orientation === 'right' ? <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.939739 11.78C0.813073 11.78 0.686406 11.7333 0.586406 11.6333C0.393073 11.44 0.393073 11.12 0.586406 10.9267L4.93307 6.58001C5.25307 6.26001 5.25307 5.74001 4.93307 5.42001L0.586406 1.07335C0.393073 0.880013 0.393073 0.560013 0.586406 0.36668C0.77974 0.173346 1.09974 0.173346 1.29307 0.36668L5.63974 4.71335C5.97974 5.05335 6.17307 5.51335 6.17307 6.00001C6.17307 6.48668 5.98641 6.94668 5.63974 7.28668L1.29307 11.6333C1.19307 11.7267 1.06641 11.78 0.939739 11.78Z" fill={disabled ? '#ABABAB' : "#1B1F23"}/>
        </svg>
         : <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M5.99953 11.78C5.87286 11.78 5.7462 11.7333 5.6462 11.6333L1.29953 7.28668C0.592865 6.58001 0.592865 5.42001 1.29953 4.71335L5.6462 0.36668C5.83953 0.173346 6.15953 0.173346 6.35286 0.36668C6.5462 0.560013 6.5462 0.880013 6.35286 1.07335L2.0062 5.42001C1.6862 5.74001 1.6862 6.26001 2.0062 6.58001L6.35286 10.9267C6.5462 11.12 6.5462 11.44 6.35286 11.6333C6.25286 11.7267 6.1262 11.78 5.99953 11.78Z" fill={disabled ? '#ABABAB' : "#1B1F23"}/>
         </svg>
         

        

    )
}

export default PaginationArrow