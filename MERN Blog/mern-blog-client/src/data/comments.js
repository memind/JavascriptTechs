export const getCommentsData = async () => {
  return [
    {
      _id: "10",
      user: {
        _id: "a",
        name: "Khalid Kashmiri",
      },
      desc: "it was a nice post, Thank you!",
      post: "1",
      parent: null,
      replyOnUser: null,
      createdAt: "2023-12-31T17:22:05.092+0000",
    },
    {
      _id: "11",
      user: {
        _id: "b",
        name: "Khidir Karawita",
      },
      desc: "a reply for Khalid",
      post: "1",
      parent: "10",
      replyOnUser: "a",
      createdAt: "2023-12-31T17:22:05.092+0000",
    },
    {
      _id: "12",
      user: {
        _id: "b",
        name: "Khidir Karawita",
      },
      desc: "keep it up bro <3",
      post: "1",
      parent: null,
      replyOnUser: null,
      createdAt: "2023-12-31T17:22:05.092+0000",
    },
    {
      _id: "13",
      user: {
        _id: "c",
        name: "Muhammad Sumbul",
      },
      desc: "I'm always interested in your content :)",
      post: "1",
      parent: null,
      replyOnUser: null,
      createdAt: "2023-12-31T17:22:05.092+0000",
    },
  ];
};
