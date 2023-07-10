import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: "xhzTkUi2Nt",
    content:
      "Excited for the photowalk tomorrow! Can't wait to capture some amazing shots in the city.",
    mediaURL: "",
    likes: {
      likeCount: 5,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [
      {
        _id: "okzxcf",
        username: "tandelmeet",
        text: "I'm looking forward to it too! It's always fun exploring new places with fellow photographers.",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
    username: "alicesmith",
    createdAt: "2022-01-10T10:55:06+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: "siFFxfYI1s",
    content: "Went a trip to a hill station!",
    mediaURL:
      "https://res.cloudinary.com/djxpf0jzi/image/upload/v1688996309/FeatherTalk/post-images/hill-station_i9ibkk.webp",
    likes: {
      likeCount: 18,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "tandelmeet",
    createdAt: "2022-05-21T10:55:06+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: "3XHvLP1fg",
    content: "Check out this amazing view from my hotel.",
    mediaURL:
      "https://res.cloudinary.com/djxpf0jzi/image/upload/v1688997723/FeatherTalk/post-images/hotel-view_nmegvv.jpg",
    likes: {
      likeCount: 14,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [
      {
        _id: "6nImWvImxo",
        username: "tandelmeet",
        text: "These are incredible! The level of detail is mind-blowing.",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
    username: "frankwilson",
    createdAt: "2022-02-10T10:55:06+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: "pOX2sDQF7e",
    content: "Returned from a React Nexus meetup and met a lot of people.",
    likes: {
      likeCount: 27,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "carolwilliams",
    createdAt: "2022-06-05T15:30:00+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: "fIHrB5Ny3X",
    content: "Took this country side photo.",
    mediaURL:
      "https://res.cloudinary.com/djxpf0jzi/image/upload/v1688997726/FeatherTalk/post-images/countryside_dip38a.jpg",
    likes: {
      likeCount: 2,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [
      {
        _id: "wcvTY7qrM4",
        username: "carolwilliams",
        text: "This is breathtaking! I can almost feel the serenity.",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
    username: "bobjohnson",
    createdAt: "2022-07-10T09:15:00+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: "tUH3oPm6Rx",
    content: "I am already scared!!",
    mediaURL:
      "https://res.cloudinary.com/djxpf0jzi/image/upload/v1688996424/FeatherTalk/post-images/bridge_kcxeua.webp",
    likes: {
      likeCount: 34,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "tandelmeet",
    createdAt: "2022-08-15T20:45:00+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: "aXLkT4zR9n",
    content:
      "Visited a local art gallery featuring stunning photography. Feeling inspired by the creativity on display!",
    mediaURL: "",
    likes: {
      likeCount: 1,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [
      {
        _id: "bER3u6SjFp",
        username: "tandelmeet",
        text: "Art galleries are the best source of inspiration. Did you have a favorite photograph?",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
    username: "carolwilliams",
    createdAt: "2022-09-20T11:30:00+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: "mNDu3jZb2A",
    content:
      "I visited one of the 7 seven wonders of the world. What a moment!",
    mediaURL:
      "https://res.cloudinary.com/djxpf0jzi/image/upload/v1688996102/FeatherTalk/post-images/taJ-mahal2_gajcig.jpg",
    likes: {
      likeCount: 25,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [
      {
        _id: "oDEs6fWc9V",
        username: "alicesmith",
        text: "I can imagine the sense of wonder you felt. City lights always leave a lasting impression.",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: "oDEs6fWc9S",
        username: "frankwilson",
        text: "I can imagine the sense of wonder you felt. City lights always leave a lasting impression.",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
    username: "tandelmeet",
    createdAt: "2022-11-12T12:10:00+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: "nGHt2yFv8R",
    content: "What a beauty!",
    mediaURL:
      "https://res.cloudinary.com/djxpf0jzi/image/upload/v1688997391/FeatherTalk/post-images/snow-leapord_gdjqno.jpg",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "bobjohnson",
    createdAt: "2023-01-07T16:55:00+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: "dJIs5kAv4G",
    content: "Took this amazing sunset pic.",
    mediaURL:
      "https://res.cloudinary.com/djxpf0jzi/image/upload/v1688995710/FeatherTalk/post-images/sunset_mtstsw.jpg",
    likes: {
      likeCount: 18,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [
      {
        _id: "pQWe2rXs5B",
        username: "bobjohnson",
        text: "These photos capture the essence of heritage art so well. It's like bringing the walls to life!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
    username: "tandelmeet",
    createdAt: "2023-02-15T10:05:00+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: "gKLt7qFu3D",
    content:
      "Just made my first Open Source Contribution and I just want to keep going.",
    likes: {
      likeCount: 12,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "emmadavis",
    createdAt: "2023-03-20T14:40:00+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: "jYRl5qNd4S",
    content: "I just attended the React Expo and WHAT a Feeling that was!",
    likes: {
      likeCount: 14,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [
      {
        _id: "qWEr6fUv5P",
        username: "emmadavis",
        text: "This is 🔥",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
    username: "davidbrown",
    createdAt: "2023-04-25T18:25:00+05:30",
    updatedAt: formatDate(),
  },
];
