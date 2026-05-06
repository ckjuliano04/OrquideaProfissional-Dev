export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/', '/login/'], // Não queremos o Google indexando áreas restritas
    },
    sitemap: 'https://orquideaprofissional.com.br/sitemap.xml',
  }
}
