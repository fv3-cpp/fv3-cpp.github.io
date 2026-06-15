const docsList =
document.getElementById("docs-list");

const markdownContent =
document.getElementById("markdown-content");

async function loadDocsList()
{
    const response =
    await fetch("/data/docs.json");

    const files =
    await response.json();

    docsList.innerHTML = "";

    files.forEach(file =>
    {
        const button =
        document.createElement("button");

        button.className =
        "doc-button";

        button.textContent =
        file.replace(".md","");

        button.onclick = () =>
        {
            location.hash =
            file;
        };

        docsList.appendChild(button);
    });

    if(location.hash)
    {
        loadMarkdown(
            location.hash.substring(1)
        );
    }
    else
    {
        loadMarkdown(files[0]);
    }
}

async function loadMarkdown(file)
{
    const response =
    await fetch("/docs/md/" + file);

    const markdown =
    await response.text();

    markdownContent.innerHTML =
    marked.parse(markdown);

    setTimeout(() =>
    {
        generateTOC();
    },50);
}

window.addEventListener(
    "hashchange",
    () =>
    {
        const file =
        location.hash.substring(1);

        loadMarkdown(file);
    }
);

loadDocsList();
