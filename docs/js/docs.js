const sidebar = document.getElementById("sidebar");
const content = document.getElementById("content");

async function loadDocs() {
    const res = await fetch("/data/docs.json");
    const docs = await res.json();

    sidebar.innerHTML = "";

    Object.entries(docs).forEach(([category, files]) => {

        const section = document.createElement("div");

        section.innerHTML = `
            <h3>${category}</h3>
        `;

        const ul = document.createElement("ul");

        files.forEach(file => {

            const li = document.createElement("li");

            const title =
                file.split("/").pop()
                    .replace(".md", "");

            li.innerHTML = `
                <a href="#" data-file="${file}">
                    ${title}
                </a>
            `;

            ul.appendChild(li);
        });

        section.appendChild(ul);
        sidebar.appendChild(section);
    });

    document.querySelectorAll("[data-file]")
        .forEach(link => {

            link.addEventListener("click", e => {

                e.preventDefault();

                loadMarkdown(
                    link.dataset.file
                );
            });
        });
}

async function loadMarkdown(file) {

    try {

        const response =
            await fetch("/docs/md/" + file);

        if (!response.ok)
            throw new Error();

        const markdown =
            await response.text();

        content.innerHTML =
            marked.parse(markdown);

    } catch {

        content.innerHTML = `
            <h2>ドキュメントが見つかりません</h2>
        `;
    }
}

loadDocs();
