export const timeAgo=(timeStamp)=>{
    const now=Date.now();
        // now we have some seconds
    const secondsAgo=Math.floor((now - timeStamp)/1000)


    // case 1 i.e less than one minute or say some secondsAgo
    if(secondsAgo<60){
        return `${secondsAgo}s Ago`;
    }

    // case 2 i.e how many minutes passed
    else if(secondsAgo < 3600)
    {
        const minutesAgo=Math.floor(secondsAgo / 60);
        return `${minutesAgo}min Ago`;

    }
    else if(secondsAgo< 86400){
        const hoursAgo=Math.floor(secondsAgo / 3600);
        return `${hoursAgo}h Ago`;
    }
    else if(secondsAgo< 604800){
        const daysAgo=Math.floor(secondsAgo / 86400)
        return `${daysAgo}d Ago`;
    }

    else {
        const weeksAgo=Math.floor(secondsAgo / 604800);
        return `${weeksAgo}w Ago`;
    }

}