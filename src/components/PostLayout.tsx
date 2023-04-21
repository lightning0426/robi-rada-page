import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import Comment from '@/components/Comment';
import CustomLink from '@/components/CustomLink';
import PageTitle from '@/components/PageTitle';
import PostBody from '@/components/PostBody';
import TableOfContents from '@/components/TableOfContents';
import formatDate from '@/lib/formatDate';
import  { useState } from 'react';

import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const marks = [
  {
    value: 0,
    label: '0°C',
  },
  {
    value: 20,
    label: '20°C',
  },
  {
    value: 50,
    label: '50°C',
  },
  {
    value: 100,
    label: '100°C',
  },
];

function valuetext(value: number) {
  return `${value}°C`;
}

export interface PostForPostLayout {
  date: string;
  title: string;
  description: string;
  body: { raw: string };
}

export type RelatedPostForPostLayout = {
  title: string;
  path: string;
} | null;

type Props = {
  post: PostForPostLayout;
  nextPost: RelatedPostForPostLayout;
  prevPost: RelatedPostForPostLayout;
  children: React.ReactNode;
};

export default function PostLayout({
  post,
  nextPost,
  prevPost,
  children,
}: Props) {
  const {
    date,
    title,
    description,
    body: { raw },
  } = post;

  const { locale } = useRouter();
  const { t } = useTranslation(['common']);
  const [percentage, setPercentage] = useState(40);
  const [rate,setrate] = useState(1);
  const increasePercentage = () => {
    if(percentage<100 && rate == 0)
    {
      setPercentage(percentage + 1);
      setrate(1);
    }
  };

  const decreasePercentage = () => {
    if(percentage>0 && rate == 1)
    {
      setPercentage(percentage - 1);
      setrate(0);
    }
  };

  return (
    <article>
      <div className="divide-y divide-gray-200 transition-colors dark:divide-gray-700">
        <header className="py-6">
          <div className="relative space-y-1 text-center">

            <div className="mb-4">
              <PageTitle>{title}</PageTitle>
            </div>    
            {/* <span className="text-2xl mr-4 text-red-500 dark:text-red">  
              <svg 
                className="inline-block absolute t-14"
                viewBox="40 0 1124 1024"
                fill="currentColor"
                height="1em"
                width="1em"
              >
                <path d="M834.1 469.2A347.49 347.49 0 00751.2 354l-29.1-26.7a8.09 8.09 0 00-13 3.3l-13 37.3c-8.1 23.4-23 47.3-44.1 70.8-1.4 1.5-3 1.9-4.1 2-1.1.1-2.8-.1-4.3-1.5-1.4-1.2-2.1-3-2-4.8 3.7-60.2-14.3-128.1-53.7-202C555.3 171 510 123.1 453.4 89.7l-41.3-24.3c-5.4-3.2-12.3 1-12 7.3l2.2 48c1.5 32.8-2.3 61.8-11.3 85.9-11 29.5-26.8 56.9-47 81.5a295.64 295.64 0 01-47.5 46.1 352.6 352.6 0 00-100.3 121.5A347.75 347.75 0 00160 610c0 47.2 9.3 92.9 27.7 136a349.4 349.4 0 0075.5 110.9c32.4 32 70 57.2 111.9 74.7C418.5 949.8 464.5 959 512 959s93.5-9.2 136.9-27.3A348.6 348.6 0 00760.8 857c32.4-32 57.8-69.4 75.5-110.9a344.2 344.2 0 0027.7-136c0-48.8-10-96.2-29.9-140.9z" />
              </svg> 
              <Slider 
               className="inline-block ml-10"
                sx={{ width: 900 }}
                aria-label="Always visible"
                defaultValue={80}
                getAriaValueText={valuetext}
                step={1}
                marks={marks}
                valueLabelDisplay="on"
                color="error"
              />
            </span>         */}
           
            <span className="text-2xl mr-4 text-red-500 dark:text-red">  
              <svg
                className="inline-block"
                viewBox="20 100 1124 1024"
                fill="currentColor"
                height="1em"
                width="1em"
              >
                <path d="M834.1 469.2A347.49 347.49 0 00751.2 354l-29.1-26.7a8.09 8.09 0 00-13 3.3l-13 37.3c-8.1 23.4-23 47.3-44.1 70.8-1.4 1.5-3 1.9-4.1 2-1.1.1-2.8-.1-4.3-1.5-1.4-1.2-2.1-3-2-4.8 3.7-60.2-14.3-128.1-53.7-202C555.3 171 510 123.1 453.4 89.7l-41.3-24.3c-5.4-3.2-12.3 1-12 7.3l2.2 48c1.5 32.8-2.3 61.8-11.3 85.9-11 29.5-26.8 56.9-47 81.5a295.64 295.64 0 01-47.5 46.1 352.6 352.6 0 00-100.3 121.5A347.75 347.75 0 00160 610c0 47.2 9.3 92.9 27.7 136a349.4 349.4 0 0075.5 110.9c32.4 32 70 57.2 111.9 74.7C418.5 949.8 464.5 959 512 959s93.5-9.2 136.9-27.3A348.6 348.6 0 00760.8 857c32.4-32 57.8-69.4 75.5-110.9a344.2 344.2 0 0027.7-136c0-48.8-10-96.2-29.9-140.9z" />
              </svg> 
              {percentage}
            </span>

            <button
              type="button"
              className="py-0.5 px-3.5 mr-2 mb-2 text-sm text-3xl text-red-400 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              onClick={decreasePercentage}
            >
              -
            </button>
            <button
              type="button"
              className="py-0.5 px-3.5 mr-2 mb-2 text-sm text-3xl text-blue-400 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              onClick={increasePercentage}
            >
              +
            </button>
            

            <div className="inline-block bg-gray-200 rounded-full dark:bg-gray-700" style={{ width: '80%' }}>
              <div
                className="bg-red-600 text-xs font-medium text-white text-center p-0.5 leading-none rounded-full"
                style={{ width: `${percentage}%` }}
              >
                {percentage}
              </div>
            </div>


            {/* <dl className="space-y-10">
              <div>
                <dt className="sr-only">{t('published-time')}</dt>
                <dd className="text-base font-medium leading-6 text-gray-500 transition-colors dark:text-gray-400">
                  <time dateTime={date}>{formatDate(date, locale)}</time>
                </dd>
              </div>
            </dl> */}
          </div>
        </header>
        <div
          className="pb-8 transition-colors lg:grid lg:grid-cols-4 lg:gap-x-6"
          style={{ gridTemplateRows: 'auto 1fr' }}
        >
          <div className="divide-y divide-gray-200 pt-10 pb-8 transition-colors dark:divide-gray-700 lg:col-span-3">
            <PostBody>{children}</PostBody>
          </div>

          {/* DESKTOP TABLE OF CONTENTS */}
          <aside>
            <div className="hidden lg:sticky lg:top-24 lg:col-span-1 lg:block">
              <TableOfContents source={raw} />
            </div>
          </aside>
        </div>

        <div className="divide-y divide-gray-200 pb-8 transition-colors dark:divide-gray-700">
          <Comment />

          {/* <footer>
            <div className="flex flex-col gap-4 pt-4 text-base font-medium sm:flex-row sm:justify-between xl:gap-8 xl:pt-8">
              {prevPost ? (
                <div className="basis-6/12">
                  <h2 className="mb-1 text-xs uppercase tracking-wide text-gray-500 transition-colors dark:text-gray-400">
                    {t('previous-article')}
                  </h2>
                  <CustomLink
                    href={prevPost.path}
                    className="text-primary-500 transition-colors hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    &larr; {prevPost.title}
                  </CustomLink>
                </div>
              ) : (
                <div />
              )}
              {nextPost && (
                <div className="basis-6/12">
                  <h2 className="mb-1 text-left text-xs uppercase tracking-wide text-gray-500 transition-colors dark:text-gray-400 sm:text-right">
                    {t('next-article')}
                  </h2>
                  <CustomLink
                    href={nextPost.path}
                    className="block text-primary-500 transition-colors hover:text-primary-600 dark:hover:text-primary-400 sm:text-right"
                  >
                    {nextPost.title} &rarr;
                  </CustomLink>
                </div>
              )}
            </div>
          </footer> */}
        </div>
      </div>
    </article>
  );
}
