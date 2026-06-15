document.addEventListener(
"DOMContentLoaded",
() =>
{
    document.addEventListener(
    "click",
    () =>
    {
        if(window.Prism)
        {
            Prism.highlightAll();
        }
    });
});
