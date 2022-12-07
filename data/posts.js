import USER_DATA from "./users";

const POSTS = [
    {
        postID: 0,
        postURL: "https://picsum.photos/500",
        user: USER_DATA[0].name,
        likes: 7570,
        caption: "Money buys everything... EVERYTHING !! ",
        profilePic: USER_DATA[0].image,
        comment: [
            {
                user: 'YOBRO',
                text: "Ha, that is true!"
            },
            {
                user: 'Tanisha',
                text: "No, this is totally ridiculous.. 😠"
            },
        ]
    },

    {
        postID: 1,
        postURL: "https://picsum.photos/id/1024/400/400",
        user: USER_DATA[1].name,
        likes: 234,
        caption: "Amazing memories !! amazing memories amazing memories amazing memories amazing memories ",
        profilePic: USER_DATA[1].image,
        comment: [
            {
                user: 'Jason',
                text: "WOW amazing"
            },
            {
                user: 'Ron',
                text: "Enjoy brother.."
            },
            {
                user: 'Rosie',
                text: "Yo !!!!"
            },
        ]
    },
    {
        postID: 2,
        postURL: "https://picsum.photos/id/1025/400/400",
        user: USER_DATA[2].name,
        likes: 234,
        caption: "Amazing memories !!",
        profilePic: USER_DATA[2].image,
        comment: [
            {
                user: 'Jason',
                text: "WOW amazing"
            },
            {
                user: 'Ron',
                text: "Enjoy brother.."
            },
        ]
    },
]

export default POSTS;
