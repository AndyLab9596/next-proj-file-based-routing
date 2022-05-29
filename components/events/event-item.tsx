import Image from 'next/image';
import React from 'react';
import { IEvent } from '../../dummy-data';
import AddressIcon from '../icons/address-icon';
import ArrowRightIcon from '../icons/arrow-right-icon';
import DateIcon from '../icons/date-icon';
import Button from '../ui/button';
import classes from './event-item.module.css';

interface EventItemProps {
    item: IEvent
}

const EventItem: React.FC<EventItemProps> = (props) => {
    const { title, description, location, date, image, isFeatured, id } = props.item;
    const humanReadableDate = new Date(date).toLocaleDateString('en-Us', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    const formattedAddress = location.replace(', ', '\n');
    const exploreLink = `/events/${id}`;

    return (
        <li className={classes.item}>
            {/* <img src={'/' + image} alt={title} /> */}
            <Image src={'/' + image} alt={title} width={250} height={160} />
            <div className={classes.content}>
                <div className={classes.summary}>
                    <h2>{title}</h2>
                    <div className={classes.date}>
                        <DateIcon />
                        <time>
                            {humanReadableDate}
                        </time>
                    </div>
                    <div className={classes.address}>
                        <AddressIcon />
                        <address>{formattedAddress}</address>
                    </div>
                </div>
                <div className={classes.actions}>
                    {/* <Link href={exploreLink} >Explore Event</Link> */}
                    <Button link={exploreLink}>
                        <span>Explore Event</span>
                        <span className={classes.icon}>
                            <ArrowRightIcon />
                        </span>
                    </Button>
                </div>
            </div>
        </li>
    )
}

export default EventItem