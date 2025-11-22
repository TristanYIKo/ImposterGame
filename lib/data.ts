export const CATEGORIES = {
    Food: [
        "Pizza", "Sushi", "Burger", "Tacos", "Pasta", "Ice Cream", "Steak", "Salad", "Pancakes", "Donut"
    ],
    Places: [
        "School", "Hospital", "Beach", "Library", "Gym", "Airport", "Cinema", "Park", "Museum", "Zoo"
    ],
    Animals: [
        "Lion", "Elephant", "Penguin", "Giraffe", "Dolphin", "Tiger", "Kangaroo", "Panda", "Zebra", "Monkey"
    ],
    Jobs: [
        "Doctor", "Teacher", "Police", "Chef", "Pilot", "Artist", "Firefighter", "Nurse", "Lawyer", "Farmer"
    ],
    Objects: [
        "Phone", "Laptop", "Chair", "Table", "Car", "Book", "Pen", "Watch", "Shoes", "Camera"
    ]
};

export type CategoryKey = keyof typeof CATEGORIES;
