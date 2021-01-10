
import * as axios from "axios"

const axiosInstance = axios.create({
	baseURL: "https://jsonplaceholder.typicode.com/",
	headers: {}
})

const URL = {
	posts: `posts`,
	comments: `comments`,
}

export const API = {
	getPosts: () => axiosInstance.get(URL.posts).then((res) => res),
	getComments: () => axiosInstance.get(URL.comments).then((res) => res)
}
