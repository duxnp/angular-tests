import { randNumber, randText, randUserName } from '@ngneat/falso';
import { timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';

const count = 30;
const data = [];

for (let i = 0; i < count; i++) {
  data.push({
    id: randNumber(),
    username: randUserName(),
    text: randText(),
  });
}

export const getData = (params = { page: 1 }) => {
  const perPage = 10;
  const offset = (params.page - 1) * perPage;
  const paginatedItems = data.slice(offset, offset + perPage);
  const hasMore = offset + perPage !== data.length;

  return {
    currentPage: params.page,
    hasMore,
    perPage,
    total: data.length,
    lastPage: Math.ceil(data.length / perPage),
    data: paginatedItems,
  };
};

export const getTweets = (params?: any) =>
  timer(1000).pipe(mapTo(getData(params)));
