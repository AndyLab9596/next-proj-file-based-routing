import React, { Fragment } from 'react'
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';
// import { getAllEvents } from '../../dummy-data';
import { useRouter } from 'next/router';
import { GetStaticProps, NextPage } from 'next';
import { getAllEvents } from '../../helper/api-utils';
import { IEvent } from '../../dummy-data';
import Head from 'next/head';

interface AllEventsPageProps {
  events: IEvent[];
}

const AllEventsPage: NextPage<AllEventsPageProps> = ({ events }) => {
  // const events = getAllEvents();
  const router = useRouter();

  const findEventsHandler = (year: string, month: string) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath)
  }

  return (
    <Fragment>
      <Head>
        <title>All Events</title>
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const events = await getAllEvents();
  return {
    props: {
      events,
    },
    revalidate: 60
  }
}

export default AllEventsPage