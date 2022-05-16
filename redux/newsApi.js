import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { NEWS_API_URL } from '../constants';

export const newsApi = createApi({
    reducerPath: 'news',
    baseQuery: fetchBaseQuery({ baseUrl: NEWS_API_URL }),
    endpoints: builder => ({
        getNews: builder.query({
            query: () => `articles`
        })
    })
});

export const { useGetNewsQuery } = newsApi;