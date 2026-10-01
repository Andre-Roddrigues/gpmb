# Project architecture rules

- Keep the institutional site as one long localized page under `/$locale`, because the brief explicitly requires anchor navigation.
- Keep all visitor-facing copy in the locale dictionaries, so Portuguese and English remain complete and consistent.
- Process contact submissions only through the server route and store them in the protected backend table, so private contact data never becomes client-readable.
- Use semantic design tokens from `src/styles.css` for visual styling, so the GPMB identity stays consistent.
