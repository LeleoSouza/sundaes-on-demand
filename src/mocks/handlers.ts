import { rest } from 'msw';

export const handlers = [
  rest.get('http://localhost:3030/scoops', (req, res, ctx) => {
    return res(
      ctx.json([
        { name: 'Chocolate', imagePath: 'img/c/img.jpg' },
        { name: 'Vanilla', imagePath: 'img/v/img.jpg' },
      ])
    );
  }),
];

export const handlersToppings = [
  rest.get('http://localhost:3030/toppings', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          name: 'M&Ms',
          imagePath: '/images/m-and-ms.png',
        },
        {
          name: 'Hot fudge',
          imagePath: '/images/hot-fudge.png',
        },
        {
          name: 'Peanut butter cups',
          imagePath: '/images/peanut-butter-cups.png',
        },
      ])
    );
  }),
];
