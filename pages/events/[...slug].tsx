import { useRouter } from 'next/router'
import React, { Fragment, useEffect, useState } from 'react'
// import { getFilteredEvents } from '../../dummy-data';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';
import { GetServerSideProps, NextPage } from 'next';
import { getFilteredEvents } from '../../helper/api-utils';
import { IEvent } from '../../dummy-data';
import useSWR from 'swr';
import Head from 'next/head';

interface FilteredEventsPageProps {
  hasError: boolean;
  events: IEvent[];
  // date: Date;
  numYear: number;
  numMonth: number;
}
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const FilteredEventsPage: NextPage<FilteredEventsPageProps> = ({ hasError, events, numMonth, numYear }) => {
  const router = useRouter();
  const [evs, setEvs] = useState<IEvent[]>(events);
  // const filteredDate = router.query.slug;
  const { data, error } = useSWR('https://nextjs-client-data-default-rtdb.asia-southeast1.firebasedatabase.app/events.json', fetcher);

  useEffect(() => {
    const events: IEvent[] = [];

    for (const key in data) {
      events.push({
        id: key,
        ...data[key]
      })
    }
    setEvs(events);
  }, [data])

  if (!evs) {
    return <p className='center' >Loading...</p>
  }

  if (hasError || error) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter ! Please adjust your values</p>
        </ErrorAlert>
        <div className="center">
          <Button link='/events'>
            Show All Events
          </Button>
        </div>
      </Fragment>
    )
  }

  const filteredEvents = events;
  const date = new Date(numYear, numMonth - 1);

  if (!filteredEvents || filteredEvents.length === 0) {
    return <Fragment>
      <ErrorAlert>
        <p>No events found for the chosen filter !</p>
      </ErrorAlert>
      <div className="center">
        <Button link='/events'>
          Show All Events
        </Button>
      </div>
    </Fragment>
  }

  return (
    <div>
      <Head>
        <title>Filtered Events</title>
        <meta name='description' content={`All events for ${numMonth}/${numYear}`} />
      </Head>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const filteredDate = params?.slug as string[]
  // console.log(filteredDate)

  const filteredYear = (filteredDate[0]);
  const filteredMonth = (filteredDate[1]);
  const numYear = Number(filteredYear);
  const numMonth = Number(filteredMonth);

  if (isNaN(numYear)
    || isNaN(numMonth)
    || numYear > 2030
    || numYear < 2021
    || numMonth < 1
    || numMonth > 12) {
    return {
      props: {
        hasError: true
      }
      // notFound: true,
      // redirect: {
      //   destination: "/error"
      // }
    }
  }

  const filteredEvents = await getFilteredEvents({ year: numYear, month: numMonth })
  // const date = new Date(numYear, numMonth - 1);

  return {
    props: {
      events: filteredEvents,
      // date,
      numYear,
      numMonth
    }
  }
}

export default FilteredEventsPage