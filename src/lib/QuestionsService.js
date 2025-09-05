import { supabase } from './supabase.js';

const questionsService = {
  // Fetch all questions for a specific activity
  async getQuestionsByActivity(activityId) {
    return await supabase
      .from('Questions')
      .select('*')
      .eq('activity_id', activityId)
      .order('created_at', { ascending: true });
  },

  // Create a new question
  async createQuestion(questionData) {
    return await supabase
      .from('Questions')
      .insert([questionData])
      .select();
  },

  // Update an existing question
  async updateQuestion(id, updates) {
    return await supabase
      .from('Questions')
      .update(updates)
      .eq('id', id)
      .select();
  },

  // Delete a question
  async deleteQuestion(id) {
    return await supabase
      .from('Questions')
      .delete()
      .eq('id', id);
  }
};

export default questionsService;