
import * as axios from "axios"

const axiosInstance = axios.create({
	baseURL: "https://my-json-server.typicode.com/MedEmis/small_projects_collections/",
	headers: {}
})
const axiosDBlocalhost = axios.create({
	baseURL: "http://localhost:4000/",
	headers: { "Content-Type": "application/json" }
})

const URL = {
	posts: `posts`,
	comments: `comments`,
	todos: `todos`,
}

export const API = {
	getPosts: async () => await axiosInstance.get(URL.posts).then(res => res),
	getComments: async () => await axiosInstance.get(URL.comments).then(res => res),
	getToDos: async () => await axiosInstance.get(URL.todos).then(res => res),
	setToDos: async (time, date, event) => await axiosInstance.post(URL.todos, { time, date, event }).then(res => res),
	deleteToDos: async (id) => await axiosInstance.delete(`${URL.todos}/${id}`).then(res => res),
}
// export const API = {
// 	getPosts: async () => await axiosInstance.get(URL.posts).then(res => res),
// 	getComments: async () => await axiosInstance.get(URL.comments).then(res => res),
// 	getToDos: async () => await axiosDBlocalhost.get(URL.todos).then(res => res),
// 	setToDos: async (time, date, event) => await axiosDBlocalhost.post(URL.todos, { time, date, event }).then(res => res),
// 	deleteToDos: async (id) => await axiosDBlocalhost.delete(`${URL.todos}/${id}`).then(res => res),
// }