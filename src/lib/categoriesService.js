import { supabase } from './supabase';

// Categories Service - handles all category-related database operations

export const categoriesService = {
  // Get all categories
  async getAllCategories() {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching categories:', error);
      return { data: null, error: error.message };
    }
  },

  // Get active categories only
  async getActiveCategories() {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching active categories:', error);
      return { data: null, error: error.message };
    }
  },

  // Get category by ID
  async getCategoryById(id) {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching category:', error);
      return { data: null, error: error.message };
    }
  },

  // Get category by name
  async getCategoryByName(name) {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .ilike('name', name)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching category by name:', error);
      return { data: null, error: error.message };
    }
  },

  // Create new category
  async createCategory(categoryData) {
    try {
      const { data, error } = await supabase
        .from('categories')
        .insert([categoryData])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error creating category:', error);
      return { data: null, error: error.message };
    }
  },

  // Update category
  async updateCategory(id, updates) {
    try {
      const { data, error } = await supabase
        .from('categories')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error updating category:', error);
      return { data: null, error: error.message };
    }
  },

  // Delete category (soft delete by setting is_active = false)
  async deleteCategory(id) {
    try {
      const { data, error } = await supabase
        .from('categories')
        .update({ is_active: false })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error deleting category:', error);
      return { data: null, error: error.message };
    }
  },

  // Hard delete category (permanently remove)
  async hardDeleteCategory(id) {
    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error('Error hard deleting category:', error);
      return { data: null, error: error.message };
    }
  },

  // Get category statistics
  async getCategoryStats() {
    try {
      // Get total categories
      const { count: totalCategories, error: totalError } = await supabase
        .from('categories')
        .select('*', { count: 'exact', head: true });

      if (totalError) throw totalError;

      // Get active categories
      const { count: activeCategories, error: activeError } = await supabase
        .from('categories')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true);

      if (activeError) throw activeError;

      // Get categories with activity counts
      const { data: categoriesWithCounts, error: countsError } = await supabase
        .from('categories')
        .select(`
          id,
          name,
          icon,
          color,
          activities:activities(count)
        `);

      if (countsError) throw countsError;

      const stats = {
        total: totalCategories || 0,
        active: activeCategories || 0,
        inactive: (totalCategories || 0) - (activeCategories || 0),
        withActivities: categoriesWithCounts?.filter(cat => cat.activities[0]?.count > 0).length || 0,
        categoriesWithCounts: categoriesWithCounts || []
      };

      return { data: stats, error: null };
    } catch (error) {
      console.error('Error fetching category stats:', error);
      return { data: null, error: error.message };
    }
  },

  // Toggle category active status
  async toggleCategoryStatus(id) {
    try {
      // First get current status
      const { data: category, error: fetchError } = await supabase
        .from('categories')
        .select('is_active')
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;

      // Toggle status
      const { data, error } = await supabase
        .from('categories')
        .update({ is_active: !category.is_active })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error toggling category status:', error);
      return { data: null, error: error.message };
    }
  },

  // Reorder categories
  async reorderCategories(categoryOrders) {
    try {
      const updates = categoryOrders.map(({ id, display_order }) => 
        supabase
          .from('categories')
          .update({ display_order })
          .eq('id', id)
      );

      const results = await Promise.all(updates);
      
      // Check for errors
      const errors = results.filter(result => result.error);
      if (errors.length > 0) {
        throw new Error(`Failed to update ${errors.length} categories`);
      }

      return { data: true, error: null };
    } catch (error) {
      console.error('Error reordering categories:', error);
      return { data: null, error: error.message };
    }
  },

  // Search categories
  async searchCategories(searchTerm) {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
        .order('display_order', { ascending: true });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error searching categories:', error);
      return { data: null, error: error.message };
    }
  }
};

export default categoriesService;
