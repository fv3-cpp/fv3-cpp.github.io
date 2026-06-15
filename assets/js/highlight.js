function highlightCode()
{
    document
    .querySelectorAll("pre code")
    .forEach(block =>
    {
        let html =
        block.innerHTML;

        const keywords =
        [
            "int",
            "float",
            "double",
            "bool",
            "char",
            "void",
            "return",
            "class",
            "struct",
            "public",
            "private",
            "protected",
            "if",
            "else",
            "for",
            "while",
            "switch",
            "case",
            "break",
            "continue",
            "namespace",
            "const",
            "static",
            "virtual",
            "new",
            "delete",
            "auto"
        ];

        keywords.forEach(keyword =>
        {
            const regex =
            new RegExp(
                "\\b" + keyword + "\\b",
                "g"
            );

            html =
            html.replace(
                regex,
                `<span class="kw">${keyword}</span>`
            );
        });

        html =
        html.replace(
            /"(.*?)"/g,
            '<span class="str">"$1"</span>'
        );

        html =
        html.replace(
            /\/\/(.*)/g,
            '<span class="com">//$1</span>'
        );

        block.innerHTML = html;
    });
}
