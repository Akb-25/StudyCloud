import express from 'express';
import dotenv from 'dotenv';
import { supabase } from '../services/supabase.js';
dotenv.config();


export const updateProgress = async (req, res) => {
    const {moduleId, courseId} = req.body;
    // const userId = req.user.id; 
    console.log("Module ID: ", moduleId);
    console.log("Course ID: ", courseId);
    const userId = "51e2f539-6f64-482a-a02a-d68b6fe4d69b";

    try {
        const { data: existing, error: fetchError } = await supabase
            .from('progress')
            .select('id, completed_modules')
            .eq('user_id', userId)
            .eq('course_id', courseId)
            .single();

        // if (fetchError && fetchError.code !== 'PGRST116') {
        //     return res.status(400).json({ error: fetchError.message });
        // }

        if (existing) {
            const updatedModules = [...new Set([...existing.completed_modules, moduleId])];

            const { error: updateError } = await supabase
                .from('progress')
                .update({
                    completed_modules: updatedModules,
                    updated_at: new Date().toISOString(),
                })
                .eq('id', existing.id);

            if (updateError) {
                return res.status(500).json({ error: updateError.message });
            }

            return res.status(200).json({ message: 'Progress updated' });
        } else {
            const { error: insertError } = await supabase
                .from('progress')
                .insert([{
                    user_id: userId,
                    course_id: courseId,
                    completed_modules: [moduleId],
                }])
                .select();

            if (insertError) {
                return res.status(500).json({ error: insertError.message });
            }

            return res.status(201).json({ message: 'Progress created' });
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
export const getProgressByUserId = async (req, res) => {
    const { courseId } = req.params;
    // const userId = req.user.id;
    const userId = "51e2f539-6f64-482a-a02a-d68b6fe4d69b";
    console.log("User ID: ", userId);
    console.log("Course ID: ", courseId);

    try {
        // Get progress data
        const { data: progress, error: progressError } = await supabase
            .from('progress')
            .select('completed_modules')
            .eq('user_id', userId)
            .eq('course_id', courseId)
            .single();

        if (progressError) {
            return res.status(400).json({ error: progressError.message });
        }

        const completedCount = progress?.completed_modules?.length || 0;

        // Get total number of modules in this course
        const { data: modules, error: moduleError } = await supabase
            .from('modules')
            .select('id')
            .eq('course_id', courseId);

        if (moduleError) {
            return res.status(400).json({ error: moduleError.message });
        }

        const totalCount = modules.length;

        const ratio = totalCount === 0 ? 0 :  Math.round((completedCount / totalCount)* 100);

        return res.status(200).json({
            completed: completedCount,
            total: totalCount,
            ratio: ratio.toFixed(2)
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};