import { supabase } from './supabase.js';

const difficultiesService = {
  // Get all difficulty levels
  async getAllDifficulties() {
    return await supabase
      .from('Difficulties')
      .select('*')
      .order('id', { ascending: true });
  },

  // Create a new difficulty level
  async createDifficulty(difficultyData) {
    return await supabase
      .from('Difficulties')
      .insert([difficultyData])
      .select();
  },

  // Update a difficulty level
  async updateDifficulty(id, updates) {
    return await supabase
      .from('Difficulties')
      .update(updates)
      .eq('id', id)
      .select();
  },

  // Delete a difficulty level
  async deleteDifficulty(id) {
    return await supabase
      .from('Difficulties')
      .delete()
      .eq('id', id);
  }
};

export default difficultiesService;