import { Helmet } from 'react-helmet-async';
import React from 'react';

export const SEO = ({ 
  title, 
  description, 
  image, 
  article = false,
  publishedTime,
  modifiedTime,
  author,
  category
}) => {
  const siteTitle = 'Limpow Blog';
  const defaultDescription = 'Blog sobre finanças pessoais e recuperação de crédito';
  const siteUrl = 'https://blog.limpow.com.br';
  const defaultImage = 'https://i.ibb.co/MZ2QtMN/limpow-logo.png';

  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const finalDescription = description || defaultDescription;
  const finalImage = image || defaultImage;

  return (
    <Helmet>
      {/* Basic */}
      <title>{fullTitle}</title>
      <meta name="description" content={finalDescription} />
      <link rel="canonical" href={siteUrl} />

      {/* Open Graph */}
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:locale" content="pt_BR" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />

      {/* Article specific */}
      {article && (
        <>
          <meta property="article:published_time" content={publishedTime} />
          {modifiedTime && (
            <meta property="article:modified_time" content={modifiedTime} />
          )}
          {author && (
            <meta property="article:author" content={author} />
          )}
          {category && (
            <meta property="article:section" content={category} />
          )}
        </>
      )}

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(
          article ? {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: title,
            image: finalImage,
            author: {
              '@type': 'Organization',
              name: 'Limpow'
            },
            publisher: {
              '@type': 'Organization',
              name: 'Limpow',
              logo: {
                '@type': 'ImageObject',
                url: defaultImage
              }
            },
            datePublished: publishedTime,
            dateModified: modifiedTime || publishedTime,
            description: finalDescription
          } : {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: siteTitle,
            url: siteUrl,
            description: finalDescription,
            publisher: {
              '@type': 'Organization',
              name: 'Limpow',
              logo: {
                '@type': 'ImageObject',
                url: defaultImage
              }
            }
          }
        )}
      </script>
    </Helmet>
  );
};