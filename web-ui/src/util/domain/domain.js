export const getSubDomain = () => {
    const fullUrl = window.location.host;
    const subparts = fullUrl.split(".");

    return subparts && subparts.length >= 2 && subparts[1] !== "vercel"
        ? subparts[0]
        : "";
};
