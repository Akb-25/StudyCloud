queries = {
    "total_users": "SELECT COUNT(*) FROM profiles",
    "total_courses": "SELECT COUNT(*) FROM courses",
}
# queries = {
#     "total_users": "SELECT COUNT(*) FROM users",
#     "total_courses": "SELECT COUNT(*) FROM courses",
#     "average_module_completion": """
#     SELECT AVG(progress)
#     FROM progress
#     WHERE progress_type = 'module'
#     """,
#     "course_completion_count": """
#         SELECT course_id, COUNT(*) as completed 
#         FROM user_course_progress 
#         WHERE progress = 100 
#         GROUP BY course_id;
#     """,
#     "most_active_users": """
#         SELECT user_id, COUNT(*) as updates 
#         FROM user_course_progress 
#         GROUP BY user_id 
#         ORDER BY updates DESC 
#         LIMIT 5;
#     """

# }