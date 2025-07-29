import type { CollectionConfig } from 'payload'

// Catrgories - Collection configuration for storing hierarchical product categories
export const Categories: CollectionConfig = {
  // slug - Used as the API endpoint path (e.g, /api/categories)
  slug: 'categories',

  // fields - Defines the schema/structure of the collection
  fields: [
    // name - The display name of the category (e.g, 'Shoes', 'Electronics)
    {
      name: 'name', // Field name used internally and in the database
      type: 'text', // Text input filed
      required: true, // Must be provided when creating/editing a category
    },

    // slug - A unique, URL-friendly identifier for the category
    {
      name: 'slug', // Field name
      type: 'text', // Text input field
      required: true, // Required field
      unique: true, // Each category must have a different slug
      index: true, // Indexed for fast lookup (e.g, filter by slug)
    },

    // color - Optional field for assigning a UI color to this category
    {
      name: 'color', // Field name
      type: 'text', // Text input, typically a color name or hex value
    },

    // parent - Self-referencing relationship field for category nesting
    {
      name: 'parent', // Field name
      type: 'relationship', // References another document
      relationTo: 'categories', // Points to the same collection (self-reference)
      hasMany: false, // Only one parent allowed
    },

    // subcategories - Virtual join to fetch all child categories based on 'parent'
    {
      name: 'subcategories', // Field name
      type: 'join', // Payload-specific join type (for virtual relationships)
      collection: 'categories', // Target collection (same one in this case)
      on: 'parent', // Join on the 'parent' field
      hasMany: true, // A category can have many subcategories
    },
  ],
}
