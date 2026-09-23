// TypeScript types for WordPress GraphQL data

// ============================================================================
// COMMON TYPES
// ============================================================================

export interface WPImage {
  id: string;
  sourceUrl: string;
  altText: string;
  title: string;
  width?: number;
  height?: number;
  mediaDetails?: {
    width: number;
    height: number;
    sizes?: {
      name: string;
      sourceUrl: string;
      width: string;
      height: string;
    }[];
  };
}

export interface WPFile {
  id: string;
  url: string;
  title: string;
  filename: string;
  filesize: number;
  mimeType: string;
}

export interface WPNode {
  id: string;
  slug: string;
  uri?: string;
}

export interface WPConnection<T> {
  nodes: T[];
  pageInfo?: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string;
    endCursor?: string;
  };
}

// ============================================================================
// SEO TYPE
// ============================================================================

export interface WPSeoData {
  title?: string;
  metaDesc?: string;
  metaKeywords?: string;
  canonical?: string;
  opengraphTitle?: string;
  opengraphDescription?: string;
  opengraphImage?: WPImage;
  opengraphType?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: WPImage;
  schema?: {
    raw?: string;
  };
  focusKeyword?: string;
}

// ============================================================================
// MENU TYPES
// ============================================================================

export interface WPMenuItem {
  id: string;
  label: string;
  url: string;
  path?: string;
  target?: string;
  cssClasses?: string[];
  order?: number;
  parentId?: string | null;
  childItems?: WPConnection<WPMenuItem>;
}

export interface WPMenu {
  id: string;
  name: string;
  slug: string;
  menuItems?: WPConnection<WPMenuItem>;
}

// ============================================================================
// PAGE TYPES
// ============================================================================

export interface WPPageHeroFields {
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: WPImage;
  heroButtonText?: string;
  heroButtonUrl?: string;
  heroButton2Text?: string;
  heroButton2Url?: string;
  heroBadge?: string;
}

export interface WPHomepageSections {
  stat1Number?: string;
  stat1Label?: string;
  stat2Number?: string;
  stat2Label?: string;
  stat3Number?: string;
  stat3Label?: string;
  stat4Number?: string;
  stat4Label?: string;
  aboutSectionTitle?: string;
  aboutSectionContent?: string;
  aboutSectionImage?: WPImage;
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButtonText?: string;
  ctaButtonUrl?: string;
  ctaSecondaryButtonText?: string;
  ctaSecondaryButtonUrl?: string;
  ctaBgImage?: WPImage;
}

export interface WPPage extends WPNode {
  databaseId: number;
  title: string;
  content?: string;
  excerpt?: string;
  featuredImage?: { node: WPImage };
  date?: string;
  modified?: string;
  pageHero?: WPPageHeroFields;
  homepageSections?: WPHomepageSections;
  seo?: WPSeoData;
  template?: {
    templateName?: string;
  };
}

// ============================================================================
// POST / BLOG TYPES
// ============================================================================

export interface WPCategory {
  id: string;
  name: string;
  slug: string;
  count?: number;
  description?: string;
}

export interface WPTag {
  id: string;
  name: string;
  slug: string;
  count?: number;
}

export interface WPAuthor {
  id: string;
  name: string;
  slug: string;
  avatar?: { url: string };
  description?: string;
}

export interface WPPost extends WPNode {
  databaseId: number;
  title: string;
  content?: string;
  excerpt?: string;
  date: string;
  modified?: string;
  featuredImage?: { node: WPImage };
  author?: { node: WPAuthor };
  categories?: WPConnection<WPCategory>;
  tags?: WPConnection<WPTag>;
  seo?: WPSeoData;
  commentCount?: number;
}

// ============================================================================
// PRODUCT TYPES
// ============================================================================

export interface WPProductDetails {
  shortDescription?: string;
  bannerImage?: WPImage;
  specifications?: string;
  material?: string;
  wireDiameter?: string;
  meshCount?: string;
  applications?: string;
  datasheet?: WPFile;
  ctaTitle?: string;
  ctaButtonText?: string;
  ctaButtonUrl?: string;
  isFeatured?: boolean;
  sortOrder?: number;
}

export interface WPProduct extends WPNode {
  databaseId: number;
  title: string;
  content?: string;
  excerpt?: string;
  featuredImage?: { node: WPImage };
  productDetails?: WPProductDetails;
  productCategories?: WPConnection<WPCategory>;
  industryTags?: WPConnection<WPTag>;
  materials?: WPConnection<WPTag>;
  seo?: WPSeoData;
}

// ============================================================================
// SERVICE TYPES
// ============================================================================

export interface WPServiceDetails {
  shortDescription?: string;
  serviceIcon?: WPImage;
  iconName?: string;
  features?: string;
  isFeatured?: boolean;
}

export interface WPService extends WPNode {
  databaseId: number;
  title: string;
  content?: string;
  excerpt?: string;
  featuredImage?: { node: WPImage };
  serviceDetails?: WPServiceDetails;
  seo?: WPSeoData;
}

// ============================================================================
// INDUSTRY TYPES
// ============================================================================

export interface WPIndustryDetails {
  shortDescription?: string;
  iconName?: string;
  bannerImage?: WPImage;
  applications?: string;
  sortOrder?: number;
}

export interface WPIndustry extends WPNode {
  databaseId: number;
  title: string;
  content?: string;
  excerpt?: string;
  featuredImage?: { node: WPImage };
  industryDetails?: WPIndustryDetails;
  seo?: WPSeoData;
}

// ============================================================================
// TEAM MEMBER TYPES
// ============================================================================

export interface WPTeamMemberDetails {
  role?: string;
  bio?: string;
  photo?: WPImage;
  linkedinUrl?: string;
  sortOrder?: number;
}

export interface WPTeamMember extends WPNode {
  databaseId: number;
  title: string;
  teamMemberDetails?: WPTeamMemberDetails;
  seo?: WPSeoData;
}

// ============================================================================
// TESTIMONIAL TYPES
// ============================================================================

export interface WPTestimonialDetails {
  quote: string;
  authorName: string;
  authorRole?: string;
  company?: string;
  authorPhoto?: WPImage;
  rating?: number;
}

export interface WPTestimonial extends WPNode {
  databaseId: number;
  title: string;
  testimonialDetails?: WPTestimonialDetails;
}

// ============================================================================
// CASE STUDY TYPES
// ============================================================================

export interface WPCaseStudyDetails {
  clientName?: string;
  clientIndustry?: string;
  challenge?: string;
  solution?: string;
  results?: string;
  productSupplied?: string;
  location?: string;
  isFeatured?: boolean;
}

export interface WPCaseStudy extends WPNode {
  databaseId: number;
  title: string;
  content?: string;
  excerpt?: string;
  featuredImage?: { node: WPImage };
  caseStudyDetails?: WPCaseStudyDetails;
  seo?: WPSeoData;
}

// ============================================================================
// FAQ TYPES
// ============================================================================

export interface WPFaqDetails {
  question: string;
  answer: string;
  faqCategory?: string;
  sortOrder?: number;
}

export interface WPFaq extends WPNode {
  databaseId: number;
  title: string;
  faqDetails?: WPFaqDetails;
}

// ============================================================================
// DOWNLOAD TYPES
// ============================================================================

export interface WPDownloadDetails {
  downloadFile?: WPFile;
  downloadType?: "brochure" | "datasheet" | "case_study" | "certificate" | "catalogue" | "other";
  description?: string;
  isFeatured?: boolean;
}

export interface WPDownload extends WPNode {
  databaseId: number;
  title: string;
  excerpt?: string;
  featuredImage?: { node: WPImage };
  downloadDetails?: WPDownloadDetails;
}

// ============================================================================
// SITE SETTINGS TYPES (stored on Site Settings page via ACF)
// ============================================================================

export interface WPSiteSettings {
  sitePhone?: string;
  sitePhone2?: string;
  siteEmail?: string;
  siteAddress?: string;
  factoryAddress?: string;
  socialLinkedin?: string;
  socialYoutube?: string;
  socialInstagram?: string;
  socialFacebook?: string;
  socialTwitter?: string;
  socialWhatsapp?: string;
  footerTagline?: string;
  copyrightText?: string;
  gaMeasurementId?: string;
  gtmId?: string;
}

// ============================================================================
// GRAPHQL RESPONSE WRAPPERS
// ============================================================================

export interface GraphQLPageData {
  page: WPPage;
}

export interface GraphQLPostData {
  post: WPPost;
}

export interface GraphQLProductData {
  product: WPProduct;
}

export interface GraphQLPagesData {
  pages: WPConnection<WPPage>;
}

export interface GraphQLPostsData {
  posts: WPConnection<WPPost>;
}

export interface GraphQLProductsData {
  products: WPConnection<WPProduct>;
}

export interface GraphQLServicesData {
  services: WPConnection<WPService>;
}

export interface GraphQLIndustriesData {
  industries: WPConnection<WPIndustry>;
}

export interface GraphQLTeamData {
  teamMembers: WPConnection<WPTeamMember>;
}

export interface GraphQLTestimonialsData {
  testimonials: WPConnection<WPTestimonial>;
}

export interface GraphQLCaseStudiesData {
  caseStudies: WPConnection<WPCaseStudy>;
}

export interface GraphQLFAQsData {
  faqs: WPConnection<WPFaq>;
}

export interface GraphQLDownloadsData {
  downloads: WPConnection<WPDownload>;
}

export interface GraphQLMenuData {
  menu: WPMenu;
}
