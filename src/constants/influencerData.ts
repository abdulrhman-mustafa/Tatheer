// src/constants/influencerData.ts

export const AVAILABLE_INTERESTS = [
    "Sport",
    "Beauty",
    "Fun",
    "Science",
    "Politics",
    "Religion",
    "Culture",
    "Kids",
];
export const SOCIAL_MEDIA_PLATFORMS = [
    { name: "Youtube", icon: "/icons/youtube.svg" },
    { name: "Instagram", icon: "/icons/instagram.svg" },
    { name: "X", icon: "/icons/x.svg" },
    { name: "Facebook", icon: "/icons/facebook.svg" },
    { name: "Snapchat", icon: "/icons/snapchat.svg" },
    { name: "Linkedin", icon: "/icons/linkedin.svg" },
];

export const GENDER_OPTIONS = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
];

export const AGE_OPTIONS = Array.from({ length: 70 }, (_, i) => i + 18).map((year) => ({
    value: `${year} Y`,
    label: `${year} Y`,
}));