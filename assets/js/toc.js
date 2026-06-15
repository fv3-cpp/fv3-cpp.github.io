function generateTOC()
{
    const toc =
    document.getElementById("toc");

    toc.innerHTML =
    "<h3>Contents</h3>";

    const headings =
    document.querySelectorAll(
        "#markdown-content h1, #markdown-content h2, #markdown-content h3"
    );

    headings.forEach((heading,index) =>
    {
        const id =
        "heading-" + index;

        heading.id = id;

        const link =
        document.createElement("a");

        link.href =
        "#" + id;

        link.textContent =
        heading.textContent;

        link.className =
        "toc-link";

        if(heading.tagName === "H2")
        {
            link.style.paddingLeft =
            "12px";
        }

        if(heading.tagName === "H3")
        {
            link.style.paddingLeft =
            "24px";
        }

        toc.appendChild(link);
    });
}
