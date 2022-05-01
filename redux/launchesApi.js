import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LAUNCHES_API_URL } from '../constants';

export const launchesApi = createApi({
    reducerPath: 'launches',
    baseQuery: fetchBaseQuery({ baseUrl: LAUNCHES_API_URL }),
    endpoints: builder => ({
        getUpcomingLaunches: builder.query({
            query: number => `launch/upcoming?limit=${number || 10}&mode=detailed`,
        })
    })
})

export const { useGetUpcomingLaunchesQuery } = launchesApi;