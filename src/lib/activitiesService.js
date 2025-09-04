import { supabase } from './supabase';

// Activities Service - handles all activity-related database operations

export const activitiesService = {
  // Get all activities
  async getAllActivities() {
    try {
      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching activities:', error);
      return { data: null, error: error.message };
    }
  },

  // Get activities by category
  async getActivitiesByCategory(category) {
    try {
      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching activities by category:', error);
      return { data: null, error: error.message };
    }
  },

  // Get activity by ID
  async getActivityById(id) {
    try {
      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching activity:', error);
      return { data: null, error: error.message };
    }
  },

  // Create new activity
  async createActivity(activityData) {
    try {
      const { data, error } = await supabase
        .from('activities')
        .insert([activityData])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error creating activity:', error);
      return { data: null, error: error.message };
    }
  },

  // Update activity
  async updateActivity(id, updates) {
    try {
      const { data, error } = await supabase
        .from('activities')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error updating activity:', error);
      return { data: null, error: error.message };
    }
  },

  // Delete activity
  async deleteActivity(id) {
    try {
      const { error } = await supabase
        .from('activities')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error('Error deleting activity:', error);
      return { error: error.message };
    }
  },

  // Search activities
  async searchActivities(searchTerm) {
    try {
      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error searching activities:', error);
      return { data: null, error: error.message };
    }
  },

  // Get activity statistics
  async getActivityStats() {
    try {
      // Get total count
      const { count: totalCount, error: countError } = await supabase
        .from('activities')
        .select('*', { count: 'exact', head: true });

      if (countError) throw countError;

      // Get activities by category
      const { data: categoryData, error: categoryError } = await supabase
        .from('activities')
        .select('category')
        .not('category', 'is', null);

      if (categoryError) throw categoryError;

      // Count by category
      const categoryStats = categoryData.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + 1;
        return acc;
      }, {});

      return { 
        data: {
          total: totalCount,
          byCategory: categoryStats
        }, 
        error: null 
      };
    } catch (error) {
      console.error('Error fetching activity stats:', error);
      return { data: null, error: error.message };
    }
  }
};

export default activitiesService;
