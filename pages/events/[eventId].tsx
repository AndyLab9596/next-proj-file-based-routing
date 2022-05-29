import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router'
import React, { Fragment } from 'react'
import EventContent from '../../components/event-detail/event-content';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventSummary from '../../components/event-detail/event-summary';
import ErrorAlert from '../../components/ui/error-alert';
import { IEvent } from '../../dummy-data';
import { getFeaturedEvents, getEventById } from '../../helper/api-utils';

interface EventDetailPageProps {
  selectedEvent: IEvent
}

const EventDetailPage: NextPage<EventDetailPageProps> = ({ selectedEvent }) => {
  // const router = useRouter();
  // const eventId = router.query.eventId as string;
  // const event = getEventById(eventId);

  if (!selectedEvent) {
    return (
      <div className='center'>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <Fragment>
      <Head>
        <title>{selectedEvent.title}</title>
      </Head>
      <EventSummary title={selectedEvent.title} />
      <EventLogistics
        date={selectedEvent.date}
        address={selectedEvent.location}
        image={selectedEvent.image}
        imageAlt={selectedEvent.title} />
      <EventContent>
        <p>{selectedEvent.description}</p>
      </EventContent>
    </Fragment>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const eventId = context?.params?.eventId as string;
  const event = await getEventById(eventId) as IEvent;

  return {
    props: {
      selectedEvent: event
    },
    revalidate: 30,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allEvents = await getFeaturedEvents();
  const ids = allEvents.map((event) => ({ params: { eventId: event.id } }));
  return {
    paths: ids,
    fallback: 'blocking',
  }
}

export default EventDetailPage