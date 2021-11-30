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
