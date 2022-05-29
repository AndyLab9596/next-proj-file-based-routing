import React from 'react'
import { IEvent } from '../../dummy-data'
import EventItem from './event-item';
import classes from './event-list.module.css';

interface EventListProps {
    items: IEvent[]
}

const EventList: React.FC<EventListProps> = (props) => {
    const { items } = props;
    return (
        <ul className={classes.list}>
            {items.map((item) => {
                return (
                    <EventItem key={item.id} item={item} />
                )
            })}
        </ul>
    )
}

export default EventList