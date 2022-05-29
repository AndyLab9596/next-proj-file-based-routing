import type { GetStaticProps, NextPage } from 'next'
import React from 'react'
import EventList from '../components/events/event-list';
import { IEvent } from '../dummy-data';
import { getFeaturedEvents } from '../helper/api-utils';
// import { getFeaturedEvents } from '../dummy-data'
import Head from 'next/head';

interface HomePageProps {
  events: IEvent[]
}

const HomePage: NextPage<HomePageProps> = ({events}) => {
  // const featuredEvents = getFeaturedEvents();

  return (
    <div>
      <Head>
        <title>
          NextJS Events
        </title>
        <meta name='description' content='Find a lot of great events...'/>
      </Head>
      <EventList items={events} />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800 
  }
}

export default HomePage;