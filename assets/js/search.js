const searchBox =
document.getElementById("search-box");

let docsIndex = [];

async function initializeSearch()
{
    const response =
    await fetch("/data/search-index.json");

    docsIndex =
    await response.json();

    searchBox.addEventListener(
        "input",
        handleSearch
    );
}

function handleSearch()
{
    const query =
    searchBox.value
    .trim()
    .toLowerCase();

    const buttons =
    document.querySelectorAll(
        ".doc-button"
    );

    if(query === "")
    {
        buttons.forEach(button =>
        {
            button.style.display =
            "block";
        });

        return;
    }

    buttons.forEach(button =>
    {
        const text =
        button.textContent.toLowerCase();

        if(text.includes(query))
        {
            button.style.display =
            "block";
        }
        else
        {
            button.style.display =
            "none";
        }
    });

    renderSearchResults(query);
}

function renderSearchResults(query)
{
    const results =
    docsIndex.filter(item =>
    {
        return (
            item.title.toLowerCase().includes(query) ||
            item.content.toLowerCase().includes(query)
        );
    });

    const container =
    document.getElementById(
        "search-results"
    );

    if(!container)
    {
        return;
    }

    container.innerHTML = "";

    if(results.length === 0)
    {
        return;
    }

    const title =
    document.createElement("h3");

    title.textContent =
    "Search Results";

    container.appendChild(title);

    results.slice(0,20).forEach(result =>
    {
        const link =
        document.createElement("a");

        link.href =
        "#" + result.file;

        link.className =
        "search-result";

        link.innerHTML =
        `
        <strong>${result.title}</strong>
        <div>${result.preview}</div>
        `;

        container.appendChild(link);
    });
}

initializeSearch();
