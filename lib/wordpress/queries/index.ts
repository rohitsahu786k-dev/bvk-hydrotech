/**
 * GraphQL fragments and queries for WordPress data
 * All queries are centralized here to avoid duplication
 */

// ============================================================================
// FRAGMENTS
// ============================================================================

export const IMAGE_FRAGMENT = `
  fragment ImageFields on MediaItem {
    id
    sourceUrl
    altText
    title
    mediaDetails {
      width
      height
    }
  }
`;

export const SEO_FRAGMENT = `
  fragment SeoFields on PostTypeSEO {
    title
    metaDesc
    canonical
    opengraphTitle
    opengraphDescription
    opengraphImage {
      ...ImageFields
    }
    twitterTitle
    twitterDescription
    twitterImage {
      ...ImageFields
    }
    schema {
      raw
    }
  }
`;

export const MENU_ITEM_FRAGMENT = `
  fragment MenuItemFields on MenuItem {
    id
    label
    url
    path
    target
    cssClasses
    order
    parentId
    childItems {
      nodes {
        id
        label
        url
        path
        target
        parentId
      }
    }
  }
`;

// ============================================================================
// PAGE QUERIES
// ============================================================================

export const GET_PAGE_BY_SLUG = `
  ${IMAGE_FRAGMENT}
  ${SEO_FRAGMENT}
  query GetPageBySlug($slug: ID!) {
    page(id: $slug, idType: URI) {
      id
      databaseId
      title
      slug
      uri
      content
      excerpt
      date
      modified
      featuredImage {
        node {
          ...ImageFields
        }
      }
      pageHero {
        heroTitle
        heroSubtitle
        heroImage {
          ...ImageFields
        }
        heroButtonText
        heroButtonUrl
        heroButton2Text
        heroButton2Url
        heroBadge
      }
      homepageSections {
        stat1Number
        stat1Label
        stat2Number
        stat2Label
        stat3Number
        stat3Label
        stat4Number
        stat4Label
        aboutSectionTitle
        aboutSectionContent
        aboutSectionImage {
          ...ImageFields
        }
        ctaTitle
        ctaDescription
        ctaButtonText
        ctaButtonUrl
        ctaSecondaryButtonText
        ctaSecondaryButtonUrl
        ctaBgImage {
          ...ImageFields
        }
      }
      seo {
        ...SeoFields
      }
    }
  }
`;

export const GET_FRONT_PAGE = `
  ${IMAGE_FRAGMENT}
  ${SEO_FRAGMENT}
  query GetFrontPage {
    page(id: "/", idType: URI) {
      id
      databaseId
      title
      slug
      uri
      content
      pageHero {
        heroTitle
        heroSubtitle
        heroImage {
          ...ImageFields
        }
        heroButtonText
        heroButtonUrl
        heroButton2Text
        heroButton2Url
        heroBadge
      }
      homepageSections {
        stat1Number
        stat1Label
        stat2Number
        stat2Label
        stat3Number
        stat3Label
        stat4Number
        stat4Label
        aboutSectionTitle
        aboutSectionContent
        aboutSectionImage {
          ...ImageFields
        }
        ctaTitle
        ctaDescription
        ctaButtonText
        ctaButtonUrl
        ctaSecondaryButtonText
        ctaSecondaryButtonUrl
        ctaBgImage {
          ...ImageFields
        }
      }
      seo {
        ...SeoFields
      }
    }
  }
`;

export const GET_ALL_PAGE_SLUGS = `
  query GetAllPageSlugs {
    pages(first: 100) {
      nodes {
        slug
        uri
      }
    }
  }
`;

// ============================================================================
// POST / BLOG QUERIES
// ============================================================================

export const BLOG_POST_CARD_FRAGMENT = `
  fragment BlogPostCard on Post {
    id
    databaseId
    title
    slug
    uri
    excerpt
    date
    modified
    featuredImage {
      node {
        id
        sourceUrl
        altText
        title
      }
    }
    author {
      node {
        id
        name
        slug
        avatar {
          url
        }
      }
    }
    categories {
      nodes {
        id
        name
        slug
      }
    }
    tags {
      nodes {
        id
        name
        slug
      }
    }
  }
`;

export const GET_ALL_POSTS = `
  ${BLOG_POST_CARD_FRAGMENT}
  query GetAllPosts($first: Int = 12, $after: String) {
    posts(first: $first, after: $after, where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }) {
      nodes {
        ...BlogPostCard
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const GET_POST_BY_SLUG = `
  ${IMAGE_FRAGMENT}
  ${SEO_FRAGMENT}
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: URI) {
      id
      databaseId
      title
      slug
      uri
      content
      excerpt
      date
      modified
      featuredImage {
        node {
          ...ImageFields
        }
      }
      author {
        node {
          id
          name
          slug
          description
          avatar {
            url
          }
        }
      }
      categories {
        nodes {
          id
          name
          slug
        }
      }
      tags {
        nodes {
          id
          name
          slug
        }
      }
      seo {
        ...SeoFields
      }
    }
  }
`;

export const GET_POSTS_BY_CATEGORY = `
  ${BLOG_POST_CARD_FRAGMENT}
  query GetPostsByCategory($categorySlug: String!, $first: Int = 12, $after: String) {
    posts(first: $first, after: $after, where: { categoryName: $categorySlug, status: PUBLISH, orderby: { field: DATE, order: DESC } }) {
      nodes {
        ...BlogPostCard
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const GET_RECENT_POSTS = `
  ${BLOG_POST_CARD_FRAGMENT}
  query GetRecentPosts($first: Int = 3) {
    posts(first: $first, where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }) {
      nodes {
        ...BlogPostCard
      }
    }
  }
`;

export const GET_ALL_POST_SLUGS = `
  query GetAllPostSlugs {
    posts(first: 500, where: { status: PUBLISH }) {
      nodes {
        slug
        uri
      }
    }
  }
`;

// ============================================================================
// PRODUCT QUERIES
// ============================================================================

export const PRODUCT_CARD_FRAGMENT = `
  fragment ProductCard on Product {
    id
    databaseId
    title
    slug
    uri
    excerpt
    featuredImage {
      node {
        id
        sourceUrl
        altText
        title
      }
    }
    productDetails {
      shortDescription
      material
      isFeatured
      sortOrder
      ctaButtonText
      ctaButtonUrl
    }
    productCategories {
      nodes {
        id
        name
        slug
      }
    }
  }
`;

export const GET_ALL_PRODUCTS = `
  ${PRODUCT_CARD_FRAGMENT}
  query GetAllProducts($first: Int = 50) {
    products(first: $first, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes {
        ...ProductCard
      }
    }
  }
`;

export const GET_FEATURED_PRODUCTS = `
  ${PRODUCT_CARD_FRAGMENT}
  query GetFeaturedProducts($first: Int = 6) {
    products(first: $first, where: { metaQuery: { metaArray: [{ key: "is_featured", value: "1", compare: EQUAL_TO }] } }) {
      nodes {
        ...ProductCard
      }
    }
  }
`;

export const GET_PRODUCT_BY_SLUG = `
  ${IMAGE_FRAGMENT}
  ${SEO_FRAGMENT}
  query GetProductBySlug($slug: ID!) {
    product(id: $slug, idType: URI) {
      id
      databaseId
      title
      slug
      uri
      content
      excerpt
      featuredImage {
        node {
          ...ImageFields
        }
      }
      productDetails {
        shortDescription
        bannerImage {
          ...ImageFields
        }
        specifications
        material
        wireDiameter
        meshCount
        applications
        ctaTitle
        ctaButtonText
        ctaButtonUrl
        isFeatured
        sortOrder
      }
      productCategories {
        nodes {
          id
          name
          slug
        }
      }
      industryTags {
        nodes {
          id
          name
          slug
        }
      }
      seo {
        ...SeoFields
      }
    }
  }
`;

export const GET_ALL_PRODUCT_SLUGS = `
  query GetAllProductSlugs {
    products(first: 500) {
      nodes {
        slug
        uri
      }
    }
  }
`;

// ============================================================================
// SERVICE QUERIES
// ============================================================================

export const GET_ALL_SERVICES = `
  ${IMAGE_FRAGMENT}
  query GetAllServices($first: Int = 50) {
    services(first: $first) {
      nodes {
        id
        databaseId
        title
        slug
        uri
        excerpt
        featuredImage {
          node {
            ...ImageFields
          }
        }
        serviceDetails {
          shortDescription
          iconName
          isFeatured
        }
      }
    }
  }
`;

export const GET_SERVICE_BY_SLUG = `
  ${IMAGE_FRAGMENT}
  ${SEO_FRAGMENT}
  query GetServiceBySlug($slug: ID!) {
    service(id: $slug, idType: URI) {
      id
      databaseId
      title
      slug
      uri
      content
      excerpt
      featuredImage {
        node {
          ...ImageFields
        }
      }
      serviceDetails {
        shortDescription
        serviceIcon {
          ...ImageFields
        }
        iconName
        features
        isFeatured
      }
      seo {
        ...SeoFields
      }
    }
  }
`;

// ============================================================================
// INDUSTRY QUERIES
// ============================================================================

export const GET_ALL_INDUSTRIES = `
  ${IMAGE_FRAGMENT}
  query GetAllIndustries($first: Int = 50) {
    industries(first: $first, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes {
        id
        databaseId
        title
        slug
        uri
        excerpt
        featuredImage {
          node {
            ...ImageFields
          }
        }
        industryDetails {
          shortDescription
          iconName
          sortOrder
        }
      }
    }
  }
`;

export const GET_INDUSTRY_BY_SLUG = `
  ${IMAGE_FRAGMENT}
  ${SEO_FRAGMENT}
  query GetIndustryBySlug($slug: ID!) {
    industry(id: $slug, idType: URI) {
      id
      databaseId
      title
      slug
      uri
      content
      excerpt
      featuredImage {
        node {
          ...ImageFields
        }
      }
      industryDetails {
        shortDescription
        iconName
        bannerImage {
          ...ImageFields
        }
        applications
        sortOrder
      }
      seo {
        ...SeoFields
      }
    }
  }
`;

// ============================================================================
// TESTIMONIAL QUERIES
// ============================================================================

export const GET_ALL_TESTIMONIALS = `
  ${IMAGE_FRAGMENT}
  query GetAllTestimonials($first: Int = 20) {
    testimonials(first: $first) {
      nodes {
        id
        databaseId
        title
        slug
        testimonialDetails {
          quote
          authorName
          authorRole
          company
          authorPhoto {
            ...ImageFields
          }
          rating
        }
      }
    }
  }
`;

// ============================================================================
// FAQ QUERIES
// ============================================================================

export const GET_ALL_FAQS = `
  query GetAllFAQs($first: Int = 50) {
    faqs(first: $first, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes {
        id
        databaseId
        title
        slug
        faqDetails {
          question
          answer
          faqCategory
          sortOrder
        }
      }
    }
  }
`;

// ============================================================================
// DOWNLOAD QUERIES
// ============================================================================

export const GET_ALL_DOWNLOADS = `
  ${IMAGE_FRAGMENT}
  query GetAllDownloads($first: Int = 50) {
    downloads(first: $first) {
      nodes {
        id
        databaseId
        title
        slug
        excerpt
        featuredImage {
          node {
            ...ImageFields
          }
        }
        downloadDetails {
          downloadFile {
            id
            url: mediaItemUrl
            title
            filename
            filesize
            mimeType
          }
          downloadType
          description
          isFeatured
        }
      }
    }
  }
`;

// ============================================================================
// MENU QUERIES
// ============================================================================

export const GET_MENU_BY_SLUG = `
  ${MENU_ITEM_FRAGMENT}
  query GetMenuBySlug($slug: ID!) {
    menu(id: $slug, idType: SLUG) {
      id
      name
      slug
      menuItems(first: 100) {
        nodes {
          ...MenuItemFields
        }
      }
    }
  }
`;

export const GET_PRIMARY_MENU = `
  ${MENU_ITEM_FRAGMENT}
  query GetPrimaryMenu {
    menus(where: { slug: "primary" }) {
      nodes {
        id
        name
        slug
        menuItems(first: 100) {
          nodes {
            ...MenuItemFields
          }
        }
      }
    }
  }
`;

export const GET_ALL_MENUS = `
  query GetAllMenus {
    menus {
      nodes {
        id
        name
        slug
        menuItems(first: 100) {
          nodes {
            id
            label
            url
            path
            target
            parentId
            order
            childItems {
              nodes {
                id
                label
                url
                path
                parentId
              }
            }
          }
        }
      }
    }
  }
`;

// ============================================================================
// TEAM QUERIES
// ============================================================================

export const GET_ALL_TEAM_MEMBERS = `
  ${IMAGE_FRAGMENT}
  query GetAllTeamMembers($first: Int = 50) {
    teamMembers(first: $first, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes {
        id
        databaseId
        title
        slug
        teamMemberDetails {
          role
          bio
          photo {
            ...ImageFields
          }
          linkedinUrl
          sortOrder
        }
      }
    }
  }
`;

// ============================================================================
// CASE STUDY QUERIES
// ============================================================================

export const GET_ALL_CASE_STUDIES = `
  ${IMAGE_FRAGMENT}
  query GetAllCaseStudies($first: Int = 20) {
    caseStudies(first: $first) {
      nodes {
        id
        databaseId
        title
        slug
        uri
        excerpt
        featuredImage {
          node {
            ...ImageFields
          }
        }
        caseStudyDetails {
          clientName
          clientIndustry
          results
          isFeatured
        }
      }
    }
  }
`;

export const GET_CASE_STUDY_BY_SLUG = `
  ${IMAGE_FRAGMENT}
  ${SEO_FRAGMENT}
  query GetCaseStudyBySlug($slug: ID!) {
    caseStudy(id: $slug, idType: URI) {
      id
      databaseId
      title
      slug
      uri
      content
      excerpt
      featuredImage {
        node {
          ...ImageFields
        }
      }
      caseStudyDetails {
        clientName
        clientIndustry
        challenge
        solution
        results
        productSupplied
        location
        isFeatured
      }
      seo {
        ...SeoFields
      }
    }
  }
`;

// ============================================================================
// SITE SETTINGS QUERY
// ============================================================================

export const GET_SITE_SETTINGS = `
  query GetSiteSettings {
    pages(where: { name: "site-settings" }, first: 1) {
      nodes {
        id
        siteSettings {
          sitePhone
          sitePhone2
          siteEmail
          siteAddress
          factoryAddress
          socialLinkedin
          socialYoutube
          socialInstagram
          socialFacebook
          socialTwitter
          socialWhatsapp
          footerTagline
          copyrightText
          gaMeasurementId
          gtmId
        }
      }
    }
  }
`;

// ============================================================================
// GENERAL SITE INFO
// ============================================================================

export const GET_SITE_INFO = `
  query GetSiteInfo {
    generalSettings {
      title
      description
      url
      email
      language
    }
  }
`;
