// src/utils/timeAgo.ts

/**
 * Calculates the time elapsed since a given date string.
 * @param dateString
 * @returns
 */
export function timeAgo(dateString: string): string {
const date = new Date(dateString);
const now = new Date();
const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

let interval = seconds / 31536000; // seconds in a year
if (interval > 1) {
    return Math.floor(interval) === 1 ? "1 year ago" : Math.floor(interval) + " years ago";
}
interval = seconds / 2592000; // seconds in a month
if (interval > 1) {
    return Math.floor(interval) === 1 ? "1 month ago" : Math.floor(interval) + " months ago";
}
interval = seconds / 86400; // seconds in a day
if (interval > 1) {
    return Math.floor(interval) === 1 ? "1 day ago" : Math.floor(interval) + " days ago";
}
interval = seconds / 3600; // seconds in an hour
if (interval > 1) {
    return Math.floor(interval) === 1 ? "1 hour ago" : Math.floor(interval) + " hours ago";
}
interval = seconds / 60; // seconds in a minute
if (interval > 1) {
    return Math.floor(interval) === 1 ? "1 minute ago" : Math.floor(interval) + " minutes ago";
}
return Math.floor(seconds) === 1 ? "1 second ago" : Math.floor(seconds) + " seconds ago";
}
