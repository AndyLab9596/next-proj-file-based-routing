import { ReactNode } from 'react';
import classes from './error-alert.module.css';

interface ErrorAlertProps {
    children: ReactNode
}

const ErrorAlert : React.FC<ErrorAlertProps> = (props) => {
  return <div className={classes.alert}>{props.children}</div>;
}

export default ErrorAlert;