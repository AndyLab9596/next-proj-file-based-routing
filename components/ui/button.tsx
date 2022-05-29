import Link from 'next/link';
import React, { ReactNode } from 'react';
import classes from './button.module.css';


interface ButtonProps {
    children: ReactNode;
    link?: string;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = (props) => {

    if(!props.link) {
        return (
            <button className={classes.button} onClick={props.onClick}>
                {props.children}
            </button>
        )
    }

    return (
        <Link href={props?.link}  >
            <a className={classes.btn}>{props.children}</a>
        </Link>
    )
}

export default Button