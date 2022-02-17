// import * as faker from 'faker';
import { timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { randNumber, randUserName, randText } from '@ngneat/falso';

const count = 30;
const data = [];

for (let i = 0; i < count; i++) {
  // data.push({
  //   id: faker.random.number(),
  //   username: faker.name.findName(),
  //   text: faker.lorem.sentence()
  // });
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
