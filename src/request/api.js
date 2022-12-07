import request from './request'

// 注册
export const RegisterApi = (params) => request.post('/register', params)
// 登录
export const LoginApi = (params) => request.post('/login', params)

export const ListApi = (params) => request.post('/student/showCourses', params)

export const SelectCourseApi = (params) => request.post('/student/selectCourse', params)

export const DropCourseApi = (params) => request.post('/student/dropCourse', params)
// 老师拉取课程
export const TeacherListApi = (params) => request.post('/teacher/showClassSchedule', params)
// 教师添加课程
export const AddCourseApi = (params) => request.post('/teacher/addCourse', params)

export const ClassCourseApi = (params) => request.post('/admin/showClassSchedule', params)

export const DeleteCourseApi = (params) => request.post('/admin/deleteCourse', params)

export const CheckCourseApi = (params) => request.post('/admin/checkCourse', params)

export const JwcAllCourseApi = (params) => request.post('/admin/showAllCourse', params)

