export const SelectTravelesList = [
    {
        id: 1,
        title: 'Just me',
        desc: 'A solo trip',
        icon: '🕺',
        people: 1
    },
    {
        id: 2,
        title: 'A Couple ',
        desc: 'A romantic getaway',
        icon: '👫',
        people: 2
    },
    {
        id: 3,
        title: 'Family',
        desc: 'A trip with family',
        icon: '👨‍👩‍👧‍👦',
        people: '3 to 5'
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'A trip with friends',
        icon: '👭',
        people: '5 to 10'
    },
    {
        id: 5,
        title: 'Group',
        desc: 'A group trip',
        icon: '👨‍👩‍👧‍👦',
        people: '10+'
    },
    {
        id: 6,
        title: 'Business',
        desc: 'A business trip',
        icon: '👨‍💼',
        people: '1+'
    }
];

export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Economical',
        desc: 'Stay conscious of costs',
        icon: '💰',
    },
    {
        id: 2,
        title: 'Standard',
        desc: 'Keep cost on the average side',
        icon: '💵',
    },
    {
        id: 3,
        title: 'Luxury',
        desc: 'Dont worry about cost',
        icon: '💳',
    }
];

export const AI_PROMPT = 'Generate Travel Plan for Location : {location}, for {totalDays} Days for {traveler} with a {budget} budget, give me Hotels option list with Hotel Name, Hotel address, Price, hotel image url, geo coordinates,rating, description, and suggest itenary with placeName, Place Details, Place image URL, Geo Coordinates, ticket pricing, time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.';
