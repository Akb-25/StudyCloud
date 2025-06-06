import express from 'express';
import dotenv from 'dotenv';
import { generateToken } from '../services/utils.js';
import { supabase } from '../services/supabase.js';
dotenv.config();

export const addCourse = async (req, res) => {
    const { title, description, thumbmail_url } = req.body;
    const{ data, error } = await supabase.from("courses").insert([{title, description, thumbmail_url}]).select();
    if (error){
        return res.status(400).json({ error: error.message});
    }
    return res.status(201).json(data[0]);
};

export const getAllCourses = async (req, res) => {
  const { data, error } = await supabase.from('courses').select('*');
  
  if (error) return res.status(500).json({ error: error.message });
  console.log(data);
  res.json(data);
};

export const getCourseById = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('courses').select('*, modules(*, questions(*))').eq('id', id).single();
  if (error) return res.status(404).json({ error: 'Course not found' });
  res.json(data);
};

export const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { title, description, thumbmail_url } = req.body;
  const { data, error } = await supabase.from('courses').update({ title, description, thumbmail_url }).eq('id', id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: 'Course updated', data });
};

export const deleteCourse = async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('courses').delete().eq('id', id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: 'Course deleted' });
};

export const addModule = async (req, res) => {
  const { id: course_id } = req.params;
  const { title, video_url, module_order } = req.body;
  const { data, error } = await supabase.from('modules').insert([{ course_id, title, video_url, module_order }]).select();
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data[0]);
};

export const getModulesByCourseId = async (req, res) => {
  const { id: course_id } = req.params;
  const { data, error } = await supabase.from('modules').select('*').eq('course_id', course_id).order('module_order', { ascending: true });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
}
export const addQA = async (req, res) => {
  const { moduleId } = req.params;
  const { question, answer } = req.body;
  const { data, error } = await supabase.from('questions').insert([{ module_id: moduleId, question, answer }]).select();
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data[0]);
};

export const getQuestionsByModuleId = async (req, res) => {
  const {moduleId} = req.params;
  const {data, error} = await supabase.from('questions').select('*').eq('module_id', moduleId);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};