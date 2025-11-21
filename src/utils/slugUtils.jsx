export const createSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') 
    .replace(/[-\s]+/g, '-')  
    .trim()
    .replace(/^-+|-+$/g, '');
};

export const slugToDisplayName = (slug) => {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};


export const slugMatches = (slug, diseaseName) => {
  return createSlug(diseaseName) === slug.toLowerCase();
};