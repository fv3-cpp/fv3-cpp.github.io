window.addEventListener(
"load",
() =>
{
    const path =
    location.pathname;

    if(path.endsWith("/"))
    {
        return;
    }

    if(!path.includes("."))
    {
        location.href =
        path + "/";
    }
});
