import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ArticleJsonLd } from 'next-seo';

import {
  getCommandPalettePosts,
  PostForCommandPalette,
} from '@/components/CommandPalette/getCommandPalettePosts';
import { useCommandPalettePostActions } from '@/components/CommandPalette/useCommandPalettePostActions';
import LayoutPerPage from '@/components/LayoutPerPage';
import PostList, { PostForPostList } from '@/components/PostList';
import SearchForm from '@/components/SearchForm';

import ConfirmationDialogRaw from '@/components/ConfirmationDialogRaw'
import { siteConfigs } from '@/configs/siteConfigs';
import { allPostsNewToOld } from '@/lib/contentLayerAdapter';
import generateRSS from '@/lib/generateRSS';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import useAutocomplete from '@mui/base/useAutocomplete';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';

const top100Films = [
  { title: 'Ingest AI', year: 1994 },
  { title: 'StockImg AI', year: 1972 },
  { title: 'GooGPT', year: 1974 },
  { title: 'Audyo', year: 2008 },
  { title: 'Durable', year: 1957 },
  { title: "Upword", year: 1993 }
];

const Label = styled('label')({
  display: 'block',
});

const Input = styled('input')(({ theme }) => ({
  width: 900,
  height:30,
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#000',
  color: theme.palette.mode === 'light' ? '#000' : '#fff',
}));

const Listbox = styled('ul')(({ theme }) => ({
  width: 900,
  marginLeft: 40,
  padding: 0,
  zIndex: 1,
  position: 'absolute',
  listStyle: 'none',
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#000',
  overflow: 'auto',
  maxHeight: 200,
  border: '1px solid rgba(0,0,0,.25)',
  '& li.Mui-focused': {
    backgroundColor: '#4a8df6',
    color: 'white',
    cursor: 'pointer',
  },
  '& li:active': {
    backgroundColor: '#2977f5',
    color: 'white',
  },
}));



type PostForIndexPage = PostForPostList;

type Props = {
  posts: PostForIndexPage[];
  commandPalettePosts: PostForCommandPalette[];
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const locale = context.locale!;

  const commandPalettePosts = getCommandPalettePosts();
  const posts = allPostsNewToOld.map((post) => ({
    slug: post.slug,
    date: post.date,
    title: post.title,
    description: post.description,
    path: post.path,
    socialImage: post.socialImage,
    pricing: post.pricing,
  })) as PostForIndexPage[];

  
  generateRSS();

  return {
    props: {
      ...(await serverSideTranslations(locale, ['indexPage', 'common'])),
      posts,
      commandPalettePosts,
    },
  };
};

const Home: NextPage<Props> = ({ posts, commandPalettePosts }) => {
  const { t } = useTranslation(['indexPage', 'common']);

  useCommandPalettePostActions(commandPalettePosts);
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: 'use-autocomplete-demo',
    options: top100Films,
    getOptionLabel: (option) => option.title,
  });

  return (
    <LayoutPerPage>
      <ArticleJsonLd
        type="Blog"
        url={siteConfigs.fqdn}
        title={siteConfigs.title}
        images={[siteConfigs.bannerUrl]}
        datePublished={siteConfigs.datePublished}
        authorName={siteConfigs.author}
        description={siteConfigs.description}
      />
      
      <div className="my-12 space-y-2 transition-colors dark:prose-dark md:prose-lg md:space-y-5">
        <h2 className="text-center">{t('intro-1')}</h2>
        <h1 className="text-center">{t('intro-2')}</h1>
        <h3 className="text-center">{t('intro-3')}</h3>
      </div>
      <div className="mb-5" style={{ alignItems: 'center', borderRadius: '100px', backgroundColor: '#ffffff' }}>
      
      <div className="p-5 inline-block">
        <span >
          <svg
            className='text-red-600 inline-block'
            viewBox="0 0 24 24"
            fill="currentColor"
            height="2em"
            width="2em"
          >
            <path d="M16.32 14.9l5.39 5.4a1 1 0 01-1.42 1.4l-5.38-5.38a8 8 0 111.41-1.41zM10 16a6 6 0 100-12 6 6 0 000 12z" />
          </svg>
        </span>
        <span className='px-2'>
          <Input {...getInputProps()} />
          
        </span>
        {groupedOptions.length > 0 ? (
          <Listbox {...getListboxProps()}>
            {(groupedOptions as typeof top100Films).map((option, index) => (
              <li {...getOptionProps({ option, index })}>{option.title}</li>
            ))}
          </Listbox>
        ) : null}
      </div>
        <Button className="my-5"variant="outlined" color="error">
          search
        </Button>
      </div>
     
      {/* <form className="group relative">
          <svg width="20" height="20" fill="currentColor" className="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500" aria-hidden="true">
             <path fill-rule="evenodd" clip-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
             </svg>
          <input className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm" type="text" aria-label="Filter projects" placeholder="Filter projects..." />
      </form> */}
      <ConfirmationDialogRaw />
      <div className="my-4 divide-y divide-gray-200 transition-colors dark:divide-gray-700">
        {/* <div className="prose prose-lg my-8 dark:prose-dark">
          <h2>{t('latest-posts')}</h2>
        </div> */}

        <PostList posts={posts} />
      </div>
    </LayoutPerPage>
  );
};

export default Home;
