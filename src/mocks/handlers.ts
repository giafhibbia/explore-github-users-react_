import { rest } from 'msw'; //  MSW utility to create REST API mock handlers

export const handlers = [
  // 1. Handle GitHub user search endpoint
  // Mocks: GET https://api.github.com/search/users?q=some_query
  rest.get('https://api.github.com/search/users', (req, res, ctx) => {
    const query = req.url.searchParams.get('q'); // Extract query param ?q=
    return res(
      ctx.status(200), // Simulate successful response
      ctx.json({
        query,
        items: [
          {
            login: 'example-user',
            id: 1,
            avatar_url: 'https://example.com/avatar.png',
            html_url: 'https://github.com/example-user',
          },
        ],
      })
    );
  }),

  // 2. Handle GitHub user detail endpoint
  // Mocks: GET https://api.github.com/users/:username
  rest.get('https://api.github.com/users/:username', (req, res, ctx) => {
    const { username } = req.params;
    return res(
      ctx.status(200),
      ctx.json({
        login: username,
        id: 123,
        avatar_url: `https://github.com/${username}.png`,
        html_url: `https://github.com/${username}`,
        followers: 42, // Simulated follower count
      })
    );
  }),

  // 3. Handle GitHub user repositories endpoint
  // Mocks: GET https://api.github.com/users/:username/repos
  rest.get('https://api.github.com/users/:username/repos', (req, res, ctx) => {
    const { username } = req.params;
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          name: `Repository 1`,
          html_url: `https://github.com/${username}/repo1`,
        },
      ])
    );
  }),
];
